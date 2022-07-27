import * as React from "react";
import { useEffect,useState } from "react";
import { PostCard } from "../../components/postCard";
import { CreatePostCard } from "../../components/createPostCard";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getAllUsers } from "./postSlice";
import { Link } from "react-router-dom";
import {
  Avatar,
  CardHeader,
  Card,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "../../styles/mui";

export const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts, postsLoader, users } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, [isLoggedIn, dispatch]);

  const [sort, setSort] = useState("latest");

  const handleChange = (event) => {
    setSort(event.target.value);
  };



  return isLoggedIn &&(
    <>
      <div className="container">
        <section className="section">
          <main className="section-main">
            <CreatePostCard />
            <div className="post-section">
              {!postsLoader && sort ==='latest' ?
                posts
                  .slice()
                  .reverse()
                  .map((post) => <PostCard key={post._id} data={post} />) : posts
                  .slice()
                  .map((post) => <PostCard key={post._id} data={post} />) }
            </div>
          </main>
          <aside className="section-aside">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sort}
                  label="Sort By"
                  onChange={handleChange}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
              </FormControl>
            </Box> <div>
            <Typography>Suggested for you :</Typography>
            {users
              .filter((a) => a.username !== user?.username)
              .map((user) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${user.username}`}
                >
                  <Card variant="outlined" className="card-users" key={user._id}>
                    <CardHeader key={user._id}
                      className="card-header"
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "#1976d2" }}
                          src={user.profileIMG}
                        />
                      }
                      title={`@${user.username}`}
                    />
                  </Card>
                </Link>
              ))}</div>
          </aside>
        </section>
      </div>
    </>
  );
};
