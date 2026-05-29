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
          className="w-full py-2 pl-4 border rounded-full
          focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </form>
  );
};

export default SearchBar;
