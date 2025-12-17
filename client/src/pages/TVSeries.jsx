import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function TVSeries() {
  const [series, setSeries] = useState([]);

  // 🔹 Get bookmarks from redux
  const bookmarks = useSelector((state) => state.bookmarks.items);

  // 🔹 Map for quick lookup (tmdbId → bookmarkId)
  const bookmarkMap = useMemo(() => {
    const map = new Map();
    bookmarks.forEach((b) => map.set(b.tmdbId, b._id));
    return map;
  }, [bookmarks]);

  useEffect(() => {
    tmdb.get("/tv/popular").then((res) => {
      setSeries(res.data.results);
    });
  }, []);

  return (
    <>
      {/* Search */}
      <SearchBar type="tv" />

      {/* Heading */}
      <h2 className="text-xl sm:text-3xl font-light mb-6">
        Popular TV Series
      </h2>

      {/* TV Series grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {series.map((tv) => (
          <MovieCard
            key={tv.id}
            item={{ ...tv, media_type: "tv" }}
            isBookmarked={bookmarkMap.has(tv.id)}
            bookmarkId={bookmarkMap.get(tv.id) || null}
          />
        ))}
      </div>
    </>
  );
}
