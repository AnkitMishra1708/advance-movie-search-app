import React, { useState } from "react";

const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Collection name required");
      return;
    }
    onCreate({name, description});
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create Collection</h2>

        <input
          type="text"
          placeholder="Collection name (e.g. Marvel Movies)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Add description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 mt-5 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
