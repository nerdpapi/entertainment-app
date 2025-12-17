import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  // 🔹 Get bookmarks from redux
  const bookmarks = useSelector((state) => state.bookmarks.items);

  // 🔹 Create map: tmdbId -> bookmarkId
  const bookmarkMap = useMemo(() => {
    const map = new Map();
    bookmarks.forEach((b) => map.set(b.tmdbId, b._id));
    return map;
  }, [bookmarks]);

  useEffect(() => {
    tmdb.get("/movie/popular").then((res) => {
      setMovies(res.data.results);
    });
  }, []);

  return (
    <>
      {/* Search */}
      <SearchBar type="movie" />

      {/* Heading */}
      <h2 className="text-xl sm:text-3xl font-light mb-6">
        Popular Movies
      </h2>

      {/* Movies grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            item={{ ...movie, media_type: "movie" }}
            isBookmarked={bookmarkMap.has(movie.id)}
            bookmarkId={bookmarkMap.get(movie.id) || null}
          />
        ))}
      </div>
    </>
  );
}
