import React, { useEffect, useState } from "react";
import { toggleWatchListApi } from "../Helper/FetchCurrentUser.jsx";

function WatchListButton({
  inWatchlist,
  setInWatchlist,
  setIsWatched,
  mediaId,
  type,
  user,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inWatchlist) {
      setInWatchlist(true);
    } else {
      setInWatchlist(false);
    }
  }, [mediaId]);

  const handleClick = async () => {
    if (loading) return;

    if (inWatchlist == true) {
      const ok = window.confirm("Remove from watch list?");
      if (!ok) return;
    }
    try {
      setLoading(true);
      const res = await toggleWatchListApi(mediaId, type);
      setInWatchlist(res.data.statusCode.added);
      setIsWatched(false);
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
          inWatchlist
            ? "bg-red-500 text-white hover:bg-red-700 transition duration-300"
            : "bg-gray-700 text-white hover:bg-gray-800 transition duration-300"
        }`}
      >
        {inWatchlist ? "Remove from watchlist" : "➕ Watchlist"}
      </button>
    </>
  );
}

export default WatchListButton;
