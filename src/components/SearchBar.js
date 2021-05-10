import React from "react";
import "./stylesheets/SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <input
        className="search-field"
        type="text"
        title="Search"
        placeholder="Search movie titles..."
        value={props.searchQuery}
        onChange={(e) => props.setSearchQuery(e.target.value)}
      />
      {props.searchQuery.length === 0 ? (
        <i className="fas fa-search search-icon"></i>
      ) : (
        <i
          className="fas fa-times fa-lg search-icon"
          onClick={(e) => props.setSearchQuery("")}
        ></i>
      )}
    </div>
  );
};

export default SearchBar;
