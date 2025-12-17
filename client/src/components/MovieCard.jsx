import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    BookmarkIcon as BookmarkOutline,
} from "@heroicons/react/24/outline";
import {
    BookmarkIcon as BookmarkSolid,
} from "@heroicons/react/24/solid";
import { FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import { removeBookmarkApi } from "../api/bookmarkApi";
import { removeBookmark } from "../features/bookmarks/bookmarkSlice";

import { addBookmarkApi } from "../api/bookmarkApi";
import { addBookmark } from "../features/bookmarks/bookmarkSlice";


export default function MovieCard({ item, isBookmarked = false, bookmarkId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBookmark = async (e) => {
        e.stopPropagation();

        try {
            if (isBookmarked) {
                await removeBookmarkApi(bookmarkId);
                dispatch(removeBookmark(bookmarkId));
            } else {
                const data = {
                    tmdbId: item.id,
                    title: item.title || item.name,
                    poster: item.poster_path,
                    type: item.media_type || "movie",
                    release_date: item.release_date,
                    first_air_date: item.first_air_date,
                };

                const saved = await addBookmarkApi(data);
                dispatch(addBookmark(saved));
            }
        } catch (err) {
            console.error("Bookmark toggle failed", err);
        }
    };


    return (
        <div
            onClick={() =>
                navigate(`/details/${item.media_type || "movie"}/${item.id}`)
            }
            className="
        relative cursor-pointer group overflow-hidden rounded-xl
        min-w-[140px] sm:min-w-[120px] lg:min-w-[170px]
        h-[140px] sm:h-[180px] lg:h-[230px]
      "
        >
            {/* Image */}
            <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path
                    }`}
                alt={item.title || item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

            {/* Bookmark */}
            <button
                onClick={handleBookmark}
                className="
          absolute top-3 right-3 z-10
          w-8 h-8 rounded-full
          bg-[#10141E]/80
          flex items-center justify-center
          hover:bg-[#FFFFFF]/50 transition
          cursor-pointer
        "
            >
                {isBookmarked ? (
                    <BookmarkSolid className="w-5 h-5 text-[#FFFFFF]" />
                ) : (
                    <BookmarkOutline className="w-5 h-5 text-[#FFFFFF]" />
                )}
            </button>

            {/* Content */}
            <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#FFFFFF]/70 mb-1">
                    <span>
                        {(item.media_type === "tv"
                            ? item.first_air_date
                            : item.release_date
                        )?.slice(0, 4) || "—"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        {item.media_type === "tv" ? (
                            <>
                                <TvIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>TV Series</span>
                            </>
                        ) : (
                            <>
                                <FilmIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Movie</span>
                            </>
                        )}
                    </span>
                    <span>•</span>
                    <span>
                        {item.adult === true ? "18+" : "PG"}
                    </span>
                </div>

                <h3 className="text-sm sm:text-base lg:text-lg font-medium text-[#FFFFFF] leading-tight">
                    {item.title || item.name}
                </h3>
            </div>
        </div>
    );
}
