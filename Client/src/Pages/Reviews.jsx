import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetMyReview, RemoveReview } from "../Helper/ReviewApi";
import Navbar from "../Components/Navbar";

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await GetMyReview();
      setReviews(data.data);
    }
    fetchReviews();
  }, []);

  const handleRemoveReview = async (reviewId) => {
    const res = await RemoveReview(reviewId);
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
  };

  const ratingShadow = (rating) => {
    switch (rating) {
      case 1:
        return "inset 0 -20px 12px rgba(239,68,68,0.6)";
      case 2:
        return "inset 0 -20px 12px rgba(234,179,8,0.6)";
      case 3:
        return "inset 0 -20px 12px rgba(249,115,22,0.6)";
      case 4:
        return "inset 0 -20px 12px rgba(34,197,94,0.6)";
      case 5:
        return "inset 0 -20px 12px rgba(168,85,247,0.6)";
      default:
        return "none";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-10 pb-15 py-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6">My Reviews ({reviews.length})</h1>

        <div className="grid grid-cols-2 gap-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400 col-span-2">
              No reviews yet. Write your first one 🎬
            </p>
          ) : (
            reviews.map((r) => {
              return (
                <div
                  key={r._id}
                  className="flex gap-4 bg-black p-4 rounded-xl border border-white hover:bg-gray-950 hover:scale-110 hover:transition duration-300 transition cursor-pointer"
                  style={{
                    boxShadow: ratingShadow(r.rating),
                  }}
                  onClick={() =>
                    navigate(
                      r.type === "tv"
                        ? `/detailed/tv/${r.mediaId}`
                        : `/detailed/movie/${r.mediaId}`
                    )
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${r.posterPath}`}
                    alt={r.mediaTitle}
                    className="w-20 h-28 object-cover rounded-lg"
                  />

                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold text-white">
                          {r.mediaTitle}
                        </h3>
                        <div>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveReview(r._id);
                            }}
                            className="bg-red-500 px-2 rounded-full hover:bg-red-700"
                          >
                            X
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400">
                        On{" "}
                        {new Date(r.createdAt)
                          .toLocaleDateString("en-GB", {
                            weekday: "long",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, "-")}
                      </p>
                    </div>

                    <p className="text-gray-300 mt-3 line-clamp-3">
                      {r.comment}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-yellow-400">
                        ⭐ {r.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
