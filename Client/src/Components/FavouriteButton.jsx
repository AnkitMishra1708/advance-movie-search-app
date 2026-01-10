import React, { useEffect, useState } from "react";
import { toggleFavouriteListApi } from "../Helper/FetchCurrentUser.jsx";

function FavouriteButton({ mediaId, type, user }) {
  const [favouriteList, setFavouriteList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.favouriteList?.some((item) => item.mediaId == mediaId)) {
      setFavouriteList(true);
    } else {
      setFavouriteList(false);
    }
  }, [user, mediaId]);

  const handleClick = async () => {
    if (loading) return;

    if (favouriteList) {
      const ok = window.confirm("Remove from favourite list?");
      if (!ok) return;
    }

    try {
      setLoading(true);
      const res = await toggleFavouriteListApi(mediaId, type);
      setFavouriteList(res.data.statusCode.added);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 cursor-pointer rounded-lg font-semibold transition
        ${
          favouriteList
            ? "bg-red-600 text-white hover:bg-red-700 transition duration-300"
            : "bg-gray-600 text-white hover:bg-gray-700 transition duration-300"
        }`}
    >
      {favouriteList ? "Remove from Favouritelist" : "+ Favourite List"}
    </button>
  );
}

export default FavouriteButton;
