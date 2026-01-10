import React from "react";

const SelectCollectionModal = ({
  isOpen,
  onClose,
  collections,
  movieId,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-[90%] max-w-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Choose Collection</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {collections?.map((col) => {
            const isSaved = col.items?.some(
              (item) => String(item.mediaId) === String(movieId)
            );

            return (
              <div
                key={col._id}
                onClick={() => {
                  onSelect(col._id);
                  onClose();
                }}
                className={`p-3 rounded-lg cursor-pointer ${
                  isSaved
                    ? "bg-green-700 border border-green-400"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <p className="font-semibold flex justify-between">
                  {col.name}
                  {isSaved && <span className="text-sm">✔ Added</span>}
                </p>

                {col.description && (
                  <p className="text-sm text-gray-400">{col.description}</p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectCollectionModal;
