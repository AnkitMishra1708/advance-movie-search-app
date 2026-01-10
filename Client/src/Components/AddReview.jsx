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
      <div className="bg-black p-4 rounded-xl relative">
        <RatingSelector
          onChange={(r) => {
            setRating(r.value);
          }}
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full pt-5 px-2 rounded bg-black text-white"
          placeholder="Write your thoughts..."
        />
        <button
          onClick={submitReview}
          className="mt-3 px-4 py-2 absolute right-4 cursor-pointer transition bottom-25 text-black font-semibold bg-white rounded-2xl hover:bg-gray-200"
        >
          Post Review
        </button>
      </div>
    </>
  );
};

export default AddReview;
