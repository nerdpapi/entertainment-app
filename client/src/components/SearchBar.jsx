import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchMulti } from "../api/searchApi";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ type = "all" }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Fetch suggestions (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchMulti(query);

        let filtered = data;

        if (type === "movie") {
          filtered = data.filter((i) => i.media_type === "movie");
        }

        if (type === "tv") {
          filtered = data.filter((i) => i.media_type === "tv");
        }

        // limit suggestions
        setSuggestions(filtered.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, type]);

  // 🔹 Navigate ONLY on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}&type=${type}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative mx-4 sm:mx-6 lg:mx-10 my-6">
      {/* SEARCH INPUT */}
      <div className="flex items-center gap-4">
        <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]/50" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            type === "movie"
              ? "Search for movies"
              : type === "tv"
              ? "Search for TV series"
              : "Search for movies or TV series"
          }
          className="
            w-full bg-transparent
            text-lg sm:text-xl
            text-[#FFFFFF]
            placeholder-[#FFFFFF]/50
            outline-none
            border-b border-transparent
            focus:border-[#FFFFFF]/30
            pb-2
            caret-[#FC4747]
          "
        />
      </div>

      {/* 🔹 SUGGESTIONS DROPDOWN */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-3 bg-[#161D2F] rounded-xl border border-[#FFFFFF]/10 shadow-lg z-50">
          {suggestions.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(
                  `/details/${item.media_type}/${item.id}`
                )
              }
              className="
                px-4 py-3 cursor-pointer
                hover:bg-[#FFFFFF]/5
                transition
              "
            >
              <p className="text-[#FFFFFF] text-sm font-medium">
                {item.title || item.name}
                <span className="text-[#FFFFFF]/50 ml-2">
                  (
                  {(item.release_date ||
                    item.first_air_date ||
                    "").slice(0, 4)}
                  )
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="mt-4 text-[#FFFFFF]/50 text-sm">
          Searching…
        </p>
      )}
    </div>
  );
}
