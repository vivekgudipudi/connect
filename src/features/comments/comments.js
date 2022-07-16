import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PostCard } from "../../components/postCard";
import { CommentCard } from "../../components/commentCard";
import { addComment } from "../comments/commentsSlice";
import { Box, Button, TextField } from "../../styles/mui";

export const Comments = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((store) => store.posts);
  const { comments } = useSelector((store) => store.comments);
  const { token } = useSelector((store) => store.auth);
  const { postID } = useParams();
  const postClicked = posts.filter((post) => post._id === postID);
  const [content, setContent] = useState();

  return (
    <div className="container">
      <section className="section">
        {postClicked.slice().map((post) => (
          <PostCard data={post} />
        ))}
        <Box className="postCard" sx={{ minWidth: 275 }}>
          <div className="comment-box">
            <TextField
              id="outlined-basic"
              label="add your comment"
              variant="outlined"
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                dispatch(
                  addComment({ token, postID, data: { text: content } })
                );
                setContent("");
              }}
            >
              comment
            </Button>
          </div>
          {comments
            ?.slice()
            ?.reverse()
            ?.map((comment) => (
              <CommentCard comment={comment} />
            ))}
        </Box>
      </section>
    </div>
  );
};
