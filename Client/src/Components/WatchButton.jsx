import React, { useEffect, useState } from "react";
import { toggleWatchedApi } from "../Helper/FetchCurrentUser.jsx";
import FavouriteButton from "./FavouriteButton.jsx";

function WatchButton({ isWatched, setIsWatched, setInWatchlist, mediaId, type, user }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWatched) {
      setIsWatched(true);
    } else {
      setIsWatched(false);
    }
  }, [mediaId]);

  const handleClick = async () => {
    if (loading) return;

    if (isWatched == true) {
      const ok = window.confirm("Remove from watched?");
      if (!ok) return;
    }
    try {
      setLoading(true);
      const res = await toggleWatchedApi(mediaId, type);
      setIsWatched(res.data.statusCode.watched);
      setInWatchlist(false);
      return;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-3 py-3 cursor-pointer rounded-lg font-semibold transition
        ${
          isWatched
            ? "bg-blue-600 pr-4 text-white hover:bg-blue-700 transition duration-300"
            : "bg-gray-700 text-white hover:bg-gray-800 transition duration-300"
        }`}
      >
        {isWatched ? "✓ Watched" : "Mark as watched"}
      </button>
      {isWatched ? (
        <FavouriteButton mediaId={mediaId} type={type} user={user} />
      ) : (
        <></>
      )}
    </>
  );
}

export default WatchButton;
