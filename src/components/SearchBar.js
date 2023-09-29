import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space } from "antd";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to the search results page with the search query
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Input.Search
        placeholder="input search text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
        enterButton
        style={{ width: "600px", marginTop: "20px", padding: "40px", height: "50px"}}
      />
    </Space>
  );
}

export default SearchBar;

// display:"flex !important", flexDirection: "row !important" , justifyContent: "center", alignContent: "center"
