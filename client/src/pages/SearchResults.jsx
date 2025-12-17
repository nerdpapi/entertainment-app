import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { searchMulti } from "../api/searchApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const bookmarks = useSelector((state) => state.bookmarks.items);

  // map bookmarks for toggle
  const bookmarkMap = useMemo(() => {
    const map = new Map();
    bookmarks.forEach((b) => map.set(b.tmdbId, b._id));
    return map;
  }, [bookmarks]);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchMulti(query);

        let filtered = data;
        if (type === "movie") filtered = data.filter(i => i.media_type === "movie");
        if (type === "tv") filtered = data.filter(i => i.media_type === "tv");

        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, type]);

  // destination based on search source
  const handleBack = () => {
    if (type === "movie") navigate("/movies");
    else if (type === "tv") navigate("/tv");
    else navigate("/");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 pt-4">
      

      {/* Search bar */}
      <SearchBar type={type} />
      <div className="flex  justify-between items-center gap-2 mt-8 text-xl sm:text-3xl font-light">
      {/* Heading */}
      {query && !loading && (
        <h2 className="">
          Found {results.length} results for ‘{query}’
        </h2>
      )}
      {/* Back button */}
      <button
        onClick={handleBack}
        className="
          flex items-center gap-2
          text-white hover:text-white/70 cursor-pointer
          transition
        "
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Back</span>
      </button>
</div>
      {/* Loading */}
      {loading && (
        <p className="mt-6 text-white/50 text-sm">
          Searching…
        </p>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              isBookmarked={bookmarkMap.has(item.id)}
              bookmarkId={bookmarkMap.get(item.id)}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && query && results.length === 0 && (
        <p className="mt-10 text-white/50 text-sm">
          No results found for ‘{query}’
        </p>
      )}
    </div>
  );
}
