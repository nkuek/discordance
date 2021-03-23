import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchBar.css";

function SearchBar() {
  const servers = useSelector((state) => state.server);

  return (
    <>
      <div>
        <h1>Search Bar HERE!</h1>
      </div>
    </>
  );
}

export default SearchBar;
