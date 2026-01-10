import React from "react";

export const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4 mt-1">
      {reviews?.map((r) => (
        <div key={r._id} className="bg-black p-4 rounded-xl">
          <div className="flex justify-between">
            <p className="font-semibold">{r.user.fullName}</p>
            <span className="text-sm text-gray-400">
              ⭐ {r.rating || "N/A"}
            </span>
          </div>

          <p className="text-sm text-gray-400">
            {new Date(r.createdAt)
              .toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "-")}
          </p>

          <p className="mt-2 text-gray-300">{r.comment}</p>
          <p className="border mt-3 rounded border-gray-700"></p>
        </div>
      ))}
    </div>
  );
};
