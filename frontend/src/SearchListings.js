import { useState } from "react";
import axios from "axios";

function SearchListings({ onSearchResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!query.trim()) {
        onSearchResults(null); // signal to reset to full list
        return;
      }
      const res = await axios.get(`http://localhost:9000/search?search_string=${encodeURIComponent(query)}`);
      onSearchResults(res.data.listings || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchListings;
