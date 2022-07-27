import "../../styles/home.css";
import { useEffect } from "react";
import { PostCard } from "../../components/postCard";
import { useSelector, useDispatch } from "react-redux";
import { getBookmarks } from "./bookmarkSlice";
import { Typography } from "../../styles/mui";

export const Bookmark = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { bookmarks, bookmarksLoader } = useSelector(
    (state) => state.bookmarks
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBookmarks({ token }));
  }, [isLoggedIn, dispatch, token]);

  return (
    <div className="container">
      <main className="section">
        {!bookmarksLoader &&
          bookmarks
            .slice()
            .reverse()
            .map((post) => <PostCard key={post._id} data={post} />)}

        {bookmarks.length === 0 ? (
          <Typography variant="h5"gutterBottom>
            No bookmarks yet.
          </Typography>
        ) : null}
      </main>
    </div>
  );
};
