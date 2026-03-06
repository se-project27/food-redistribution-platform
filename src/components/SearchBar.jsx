import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (onSearch) onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search listings..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full p-2 border rounded-lg"
    />
  );
};

export default SearchBar;