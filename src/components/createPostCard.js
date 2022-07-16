import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Card,
  Button,
  Input,
  CardActions,
  CardContent,
  Box,
  SendIcon,
} from "../styles/mui";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../features/posts/postSlice";

export const CreatePostCard = () => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");
  const { token, user } = useSelector((state) => state.auth);
  const createPostHandler = () => {
    if (postContent.length > 0) {
      dispatch(createPost({ token, data: { content: postContent } }));
    }
    setPostContent("");
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent className="create-card-header">
            <Avatar sx={{ bgcolor: "#1976d2" }} src={user.profileIMG} />
            <Input
              placeholder="what's happening..."
              className="create-card-input"
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              fullWidth
            />
          </CardContent>
          <CardActions className="create-card-actions">
            <Button
              size="small"
              variant="contained"
              onClick={() => createPostHandler()}
              endIcon={<SendIcon />}
            >
              Post
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};
