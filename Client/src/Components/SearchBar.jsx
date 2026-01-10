import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();         
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex justify-center"
    >
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-2 pl-10 border rounded-full
          focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
      </div>
    </form>
  );
};

export default SearchBar;
