import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import {
  addLiked,
  removeLiked,
  getAllUsers,
  deletePost,
  editPost,
} from "../features/posts/postSlice";
import { getComments } from "../features/comments/commentsSlice";
import {
  addBookmark,
  removeBookmark,
} from "../features/bookmark/bookmarkSlice";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  FavoriteBorderSharpIcon,
  ChatBubbleOutlineOutlinedIcon,
  BookmarkBorderOutlinedIcon,
  CardHeader,
  MoreVertIcon,
  Avatar,
  BookmarkOutlinedIcon,
  FavoriteSharpIcon,
  styled,
  Menu,
  alpha,
  MenuItem,
  EditIcon,
  DeleteIcon,
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

export const PostCard = ({ data }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.posts);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const isBookMarked = bookmarks.some((post) => post._id === data._id);
  const isLiked = data?.likes?.likedBy?.some(
    (name) => name.username === user?.username
  );
  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const filteredUsers = users.filter(
    (user) => user?.username === data?.username
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [toggleEdit, setToggleEdit] = useState(false);
  const [content, setContent] = useState(data.content);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Box className="postCard" sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardHeader
              className="card-header"
              avatar={
                <Avatar
                  sx={{ bgcolor: "#1976d2" }}
                  src={
                    filteredUsers
                      .slice()
                      .reverse()
                      .map((item) => item.profileIMG)[0]
                  }
                />
              }
              action={
                <IconButton aria-label="settings">
                  {data?.username === user?.username ? (
                    <MoreVertIcon onClick={handleClick} />
                  ) : null}
                </IconButton>
              }
              title={data.username}
              subheader={filteredUsers
                .slice()
                .reverse()
                .map((item) => item.bio)}
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
                  dispatch(deletePost({ token, data: data }));
                }}
                disableRipple
              >
                <DeleteIcon />
                Delete
              </MenuItem>
            </StyledMenu>

            <CardContent>
              {!toggleEdit ? (
                <Typography variant="body2">{data.content}</Typography>
              ) : (
                <>
                  <TextField
                    className="contentEditBox"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    multiline
                    fullWidth
                  />
                  <Button
                    onClick={() => {
                      setToggleEdit(false);
                      dispatch(
                        editPost({
                          token,
                          data: data,
                          newContent: {
                            content: content,
                            comments: [{ text: "", username: "", _id: uuid() }],
                          },
                        })
                      );
                      setContent("");
                    }}
                  >
                    save
                  </Button>
                </>
              )}
            </CardContent>
            <CardActions className="card-actions">
              <div>
                {isLiked ? (
                  <IconButton
                    onClick={() => {
                      dispatch(removeLiked({ token, data }));
                    }}
                  >
                    <FavoriteSharpIcon color="primary" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      dispatch(addLiked({ token, data }));
                    }}
                  >
                    <FavoriteBorderSharpIcon color="primary" />
                  </IconButton>
                )}
                <Div className="likeCount">{data.likes.likeCount}</Div>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/comments/${data._id}`}
                >
                  <IconButton onClick={() => dispatch(getComments({ data }))}>
                    <ChatBubbleOutlineOutlinedIcon color="primary" />
                  </IconButton>
                </Link>
                <Div className="likeCount">{data?.comments?.length}</Div>
              </div>
              <div>
                {isBookMarked ? (
                  <IconButton
                    onClick={() => {
                      dispatch(removeBookmark({ token, data }));
                    }}
                  >
                    <BookmarkOutlinedIcon color="primary" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      dispatch(addBookmark({ token, data }));
                    }}
                  >
                    <BookmarkBorderOutlinedIcon color="primary" />
                  </IconButton>
                )}
              </div>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
};
