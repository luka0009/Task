import React, { useState, useEffect } from "react";

function Search({ characters, setFilteredCharacters }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

  return (
    <div className="mt-10">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search characters"
      />
    </div>
  );
}

export default Search;
