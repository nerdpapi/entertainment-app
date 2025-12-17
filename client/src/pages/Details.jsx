import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDetails,
  getTrailer,
} from "../api/detailsApi";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
//   const [providers, setProviders] = useState(null); 

  useEffect(() => {
    getDetails(type, id).then(setDetails);
    getTrailer(type, id).then(setTrailer);
    // getWatchProviders(type, id).then(setProviders);
  }, [type, id]);

  if (!details) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Loading details...
      </div>
    );
  }

  const title = details.title || details.name;
  const firstAir = details.first_air_date || details.release_date;
  const lastAir = details.last_air_date;
  const rating = details.vote_average?.toFixed(1);

//   /* ---------------- WATCH PROVIDERS LOGIC (ADDED) ---------------- */

//   const country = "IN"; // change to "US", "DE" if needed
//   const watchOptions = providers?.results?.[country];
//   const flatrate = watchOptions?.flatrate || [];

//   /* ---------------------------------------------------------------- */

  return (
    <div className="relative">
      {/* ⬅️ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          absolute top-0 right-0
          flex items-center gap-2
          text-white hover:text-white/70
          transition pt-0 lg:pt-14 cursor-pointer
        "
      >
        <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12">
        {/* LEFT POSTER */}
        <div
          className="
            w-full aspect-[2/3]
            mt-10 rounded-sm
            overflow-hidden shadow-lg
          "
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="pt-0 lg:pt-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-3">
            {title}
          </h1>

          {details.tagline && (
            <p className="text-white/60 text-base sm:text-lg mb-8">
              {details.tagline}
            </p>
          )}

          <div className="flex items-center gap-4 mb-10">
            <span className="text-3xl sm:text-4xl font-semibold">
              {rating}
            </span>
            <span className="text-yellow-400 text-xl sm:text-3xl">
              ★★★★☆
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <p className="text-white/50 mb-1">Language</p>
              <p>{details.original_language?.toUpperCase()}</p>
            </div>

            <div>
              <p className="text-white/50 mb-1">First Air</p>
              <p>{firstAir}</p>
            </div>

            {lastAir && (
              <div>
                <p className="text-white/50 mb-1">Last Air</p>
                <p>{lastAir}</p>
              </div>
            )}

            <div>
              <p className="text-white/50 mb-1">Status</p>
              <p>{details.status}</p>
            </div>
          </div>

          {/* GENRES */}
          <div className="mb-10">
            <p className="text-white/50 mb-3">Genres</p>
            <div className="flex gap-3 flex-wrap">
              {details.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-4 py-1.5 rounded-sm bg-white text-black font-medium"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/*  WHERE TO WATCH (ADDED SECTION)
          {flatrate.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg sm:text-xl font-medium mb-4">
                Where to Watch
              </h3>

              <div className="flex flex-wrap gap-4">
                {flatrate.map((p) => (
                  <a
                    key={p.provider_id}
                    href={watchOptions.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex items-center gap-2
                      px-4 py-2
                      bg-white text-black
                      rounded-sm
                      text-sm font-medium
                      hover:opacity-90
                      transition
                    "
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                      alt={p.provider_name}
                      className="w-6 h-6 rounded"
                    />
                    Watch on {p.provider_name}
                  </a>
                ))}
              </div>
            </div>
          )} */}

          {/* SYNOPSIS */}
          <div className="mb-12 max-w-3xl">
            <h3 className="text-lg sm:text-xl font-medium mb-3">
              Synopsis
            </h3>
            <p className="text-white/70 leading-relaxed">
              {details.overview}
            </p>
          </div>

          {/* CASTS */}
          {details.credits?.cast && (
            <div className="mb-12">
              <h3 className="text-lg sm:text-xl font-medium mb-4">
                Casts
              </h3>
              <div className="flex gap-3 flex-wrap">
                {details.credits.cast.slice(0, 4).map((c) => (
                  <span
                    key={c.id}
                    className="px-4 py-1.5 rounded-md border-2 border-white"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details.homepage && (
            <a
              href={details.homepage}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-sm
                bg-[#5A698F] hover:bg-[#6d7ea8]
                transition
              "
            >
              Website 🔗
            </a>
          )}
        </div>
      </div>

      {/* TRAILER */}
      {trailer && (
        <div className="mt-20 max-w-5xl">
          <h2 className="text-xl sm:text-3xl font-medium mb-5">
            Trailer
          </h2>
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
