import React, { useState } from "react";
import { BiSearch} from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
  const [query] = useSearchParams();
  const [keyword, setKeyword] = useState(query.get(field) || "");

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });
      onClickSearchIcon();
    }
  };

  const onClickSearchIcon = () => {
    setSearchQuery({ ...searchQuery, page: 1, [field]: keyword });
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={onCheckEnter}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
        className="admin-search-box"
      />
      <BiSearch
      className="admin-search-icon"
      onClick={onClickSearchIcon}
      />
    </div>
  );
};

export default SearchBox;