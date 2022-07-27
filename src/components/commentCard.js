import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, editComment } from "../features/comments/commentsSlice";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  styled,
  Menu,
  alpha,
  MenuItem,
  EditIcon,
  DeleteIcon,
  MoreVertIcon,
  IconButton,
  TextField,
  Button,
} from "../styles/mui";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const CommentCard = ({ comment }) => {
  const { users } = useSelector((store) => store.posts);
  const { user, token } = useSelector((store) => store.auth);
  const { postID } = useParams();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [content, setContent] = useState(comment.text);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [toggleEdit, setToggleEdit] = useState(false);
  return (
    <Card variant="outlined" key={comment._id} className="postCard">
      <CardHeader
        className="card-header"
        avatar={
          <Avatar
            sx={{ bgcolor: "#1976d2" }}
            src={
              users
                .filter((user) => user.username === comment.username)
                .slice()
                .map((user) => user.profileIMG)[0]
            }
          />
        }
        action={
          <IconButton aria-label="settings">
            {comment?.username === user?.username ? (
              <MoreVertIcon onClick={handleClick} />
            ) : null}
          </IconButton>
        }
        title={comment.username}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{ "aria-labelledby": "demo-customized-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setToggleEdit(true);
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(deleteComment({ token, postID, commentID: comment._id }));
          }}
          disableRipple
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
      <CardContent>
        {!toggleEdit ? ( 
          <Typography variant="body2">{comment.text}</Typography>
        ) : ( 
          <div className="comment-box">
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="outlined-basic"
              variant="outlined"
              fullWidth
            />
            <Button
              variant="text"
              onClick={() => {
                setToggleEdit(false);
                dispatch(
                  editComment({
                    token,
                    postID,
                    commentID: comment._id,
                    newContent: { text: content },
                  })
                );
                setContent("");
              }}
            >
              comment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
