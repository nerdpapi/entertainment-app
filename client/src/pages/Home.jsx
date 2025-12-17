import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tmdb } from "../api/tmdb";
import { setMovies } from "../features/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    tmdb.get("/trending/all/week").then((res) => {
      dispatch(setMovies(res.data.results));
    });
  }, [dispatch]);

  // Split data
  const trending = useMemo(
    () => movies.slice(0, 4),
    [movies]
  );

  const recommended = useMemo(
    () => movies.slice(5),
    [movies]
  );

  const bookmarks = useSelector((state) => state.bookmarks.items);

const bookmarkMap = useMemo(() => {
  const map = new Map();
  bookmarks.forEach((b) => map.set(b.tmdbId, b._id));
  return map;
}, [bookmarks]);

  return (
    <>
      {/* Search */}
      <SearchBar />

      {/* Trending Section */}
      <section className="mb-10">
        <h2 className="text-xl sm:text-3xl font-light mb-6">
          Trending
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {trending.map((item) => (
            <MovieCard key={item.id} item={item} isBookmarked={bookmarkMap.has(item.id)}
            bookmarkId={bookmarkMap.get(item.id) || null} />
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <section>
        <h2 className="text-xl sm:text-3xl font-light mb-6">
          Recommended for you
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {recommended.map((item) => (
            <MovieCard key={item.id} item={item} isBookmarked={bookmarkMap.has(item.id)}
            bookmarkId={bookmarkMap.get(item.id) || null} />
          ))}
        </div>
      </section>
    </>
  );
}
