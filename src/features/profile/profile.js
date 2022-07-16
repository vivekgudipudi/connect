import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CardActions,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  CardHeader,
  Link,
  Typography,
  TextField,
} from "../../styles/mui";
import { useSelector, useDispatch } from "react-redux";
import { PostCard } from "../../components/postCard";
import { useParams } from "react-router-dom";
import {
  addFollow,
  removeFollow,
  editProfile,
  getUser,
  getPosts,
} from "../posts/postSlice";
export const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const { username } = useParams();
  const { posts, singleUser } = useSelector((store) => store.posts);
  const { user, token } = useSelector((store) => store.auth);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const [URL, setURL] = useState("");
  const filteredPosts = posts.filter((post) => post.username === username);
  useEffect(() => {
    dispatch(getUser(username));
    dispatch(getPosts())
  }, [username]);

  const profileIMGhandler = ()=>{ 
    if(window.URL){
    return window.URL.createObjectURL(profilePic)
  }
   return null; 
  }

  return (
    <div className="container">
      <Box className="profile-section">
        <Box className="profile-head">
          <CardHeader
            className="card-header"
            avatar={
              <Avatar
                sx={{ bgcolor: "#1976d2" }}
                src={singleUser?.profileIMG}
              />
            }
          />
          <Typography variant="body2" gutterBottom>
            @{singleUser?.username}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {singleUser?.firstName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {singleUser?.bio}
          </Typography>
          <Link href={singleUser?.profileURL}>{singleUser?.profileURL}</Link>
          <Box>
            <section className="profile-following">
              <section className="following-box">
                <span>Post</span>
                <span>{filteredPosts?.length}</span>
              </section>
              <section className="following-box">
                <span>Followers</span>
                <span>{singleUser?.followers?.length}</span>
              </section>
              <section className="following-box">
                <span>Following</span>
                <span>{singleUser?.following?.length}</span>
              </section>
            </section>
          </Box>
          <CardActions className="create-card-actions">
            {user?.username === singleUser?.username ? (
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleClickOpen()}
              >
                Update Profile
              </Button>
            ) : !singleUser?.followers?.some(
                (el) => el?.username === user?.username
              ) ? (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  dispatch(addFollow({ token, followID: singleUser?._id }));
                }}
              >
                Follow
              </Button>
            ) : (
              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  dispatch(removeFollow({ token, followID: singleUser?._id }))
                }
              >
                unFollow
              </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <div className="updateDialog">
                  {" "}
                  <div style={{ position: "relative" }}>
                    <Avatar
                      size="large"
                      sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}
                      src={
                        profilePic === null ? singleUser?.profileIMG : profileIMGhandler()
                      }
                    />
                    
                    <IconButton
                      style={{
                        position: "absolute",
                        right: -9,
                        top: 35,
                        padding: "1px",
                        backgroundColor: "white",
                      }}
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        style={{ backgroundColor: "white" }}
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </div>
                  <Typography variant="h6" gutterBottom>
                    {singleUser?.firstName}
                  </Typography>
                </div>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Bio"
                  type="text"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setBio(e.target.value)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="URL"
                  type="text"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setURL(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    dispatch(
                      editProfile({
                        token,
                        data: { bio: bio, profileURL: URL, profileIMG : profileIMGhandler() },
                      })
                    );
                    dispatch(getUser(username));
                    dispatch(getPosts())
                    handleClose();
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Box>

        {filteredPosts
          .slice()
          .reverse()
          .map((post) => (
            <PostCard key={post._id} data={post} />
          ))}
      </Box>
    </div>
  );
};
