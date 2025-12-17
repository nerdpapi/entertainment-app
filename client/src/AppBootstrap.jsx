import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBookmarks } from "./features/bookmarks/bookmarkSlice";
import { fetchBookmarks } from "./api/bookmarkApi";

export default function AppBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBookmarks().then((data) => {
      dispatch(setBookmarks(data));
    });
  }, [dispatch]);

  return children;
}
