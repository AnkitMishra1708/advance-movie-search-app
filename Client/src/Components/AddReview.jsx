import React, { useState } from "react";
import { AddReviews } from "../Helper/ReviewApi.jsx";
import RatingSelector from "./RatingSelector.jsx";

const AddReview = ({
  mediaId,
  mediaType,
  mediaTitle,
  posterPath,
  onReviewAdded,
}) => {

  console.log(onReviewAdded);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const submitReview = async () => {
    if (!comment.trim()) return alert("Write something");

    const res = await AddReviews({
      mediaId,
      type: mediaType,
      mediaTitle,
      posterPath,
      rating,
      comment,
    });

    setComment("");
  };

  return (
    <>
      <div className="bg-black p-4 rounded-xl">
        <RatingSelector
          onChange={(r) => {
            setRating(r.value);
          }}
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mt-4 p-3 min-h-[120px] sm:min-h-[150px] rounded-lg bg-zinc-900 text-white resize-none focus:outline-none"
          placeholder="Write your thoughts..."
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={submitReview}
            className="px-4 py-2 sm:px-5 sm:py-2.5 cursor-pointer transition text-black font-semibold bg-white rounded-xl hover:bg-gray-200"
          >
            Post Review
          </button>
        </div>
      </div>
    </>
  );
};

export default AddReview;
