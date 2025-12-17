import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../api/bookmarkApi";
import { setBookmarks } from "../features/bookmarks/bookmarkSlice";
import MovieCard from "../components/MovieCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const [search, setSearch] = useState("");

  // Fetch bookmarks on load
  useEffect(() => {
    fetchBookmarks().then((data) => {
      dispatch(setBookmarks(data));
    });
  }, [dispatch]);

  // 🔍 Search inside bookmarks (handles title/name safely)
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((item) =>
      (item.title || item.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [bookmarks, search]);

  // 🎬 Movie bookmarks (handles media_type or type)
  const movieBookmarks = filteredBookmarks.filter(
    (item) =>
      item.media_type === "movie" ||
      item.type === "movie"
  );

  // 📺 TV bookmarks
  const tvBookmarks = filteredBookmarks.filter(
    (item) =>
      item.media_type === "tv" ||
      item.type === "tv"
  );

  // No bookmarks at all
  if (!bookmarks.length) {
    return (
      <div className="text-center mt-20 text-gray-400">
        <h2 className="text-xl sm:text-3xl font-light">
          No bookmarks added yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* 🔍 Search */}
      <div className="relative mx-4 sm:mx-6 lg:mx-10 my-6 flex items-center gap-4">
      <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" />
      <input
        type="text"
        placeholder="Search for bookmarked shows"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent
            text-lg sm:text-xl
            text-white
            placeholder-white/50
            outline-none
            border-b border-transparent
            focus:border-white/30
            pb-2
            caret-[#FC4747]"
      />
</div>
      {/*  Bookmarked Movies */}
      {movieBookmarks.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl sm:text-3xl font-light mb-6">
            Bookmarked Movies
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieBookmarks.map((item) => (
              <MovieCard
                key={item._id}
                item={{
                  id: item.tmdbId,
                  title: item.title || item.name,
                  poster_path: item.poster,
                  media_type: "movie",
                  release_date: item.release_date,
                }}
                isBookmarked
                bookmarkId={item._id}
              />
            ))}
          </div>
        </section>
      )}

      {/* 📺 Bookmarked TV Series */}
      {tvBookmarks.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-3xl font-light mb-6">
            Bookmarked TV Series
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {tvBookmarks.map((item) => (
                
              <MovieCard
                key={item._id}
                item={{
                  id: item.tmdbId,
                  title: item.title || item.name,
                  poster_path: item.poster,
                  media_type: "tv",
                  first_air_date: item.first_air_date,
                }}
                isBookmarked
                bookmarkId={item._id}
              />
            ))}
          </div>
        </section>
      )}

      {/* ❌ No results after search */}
      {!movieBookmarks.length && !tvBookmarks.length && search && (
        <p className="text-gray-400 mt-10">
          No results found
        </p>
      )}
    </>
  );
}
