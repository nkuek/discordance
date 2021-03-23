import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchBar.css";

function SearchBar() {
  const servers = useSelector((state) => state.server);

  let [use, setUse] = useState([]);

  const test = () => {
    return <div></div>;
  };

  let filter = [];
  let searchTitles;
  let searchResult;
  let filteredServers;
  let res;
  let res1 = {};
  const searchBar = () => {
    window.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();
      if (!searchString.length || searchString.length < 3) {
      } else {
        filteredServers = servers.filter((server) => {
          searchTitles =
            server.name.toLowerCase().includes(searchString) ||
            server.description.toLowerCase().includes(searchString);

          filter = [searchTitles, server];
          // console.log(filter);

          searchResult = filter.map((real) => {
            // console.log(deal, true);
            // console.log(real);
            if (searchTitles === true) {
              let deal = real?.name;
              // let description = real?.description;
              // console.log(deal);
              res = (
                <>
                  <div className="dropdown__search-bar" id="serverSearch">
                    <li id="searchText">
                      {/* {deal.map((mapped) => {
                        if (mapped) console.log(mapped);
                      })} */}
                      {[
                        <NavLink
                          id="searchText-anchor"
                          className="popUp-search__anchor"
                          to={`/servers/${real.id}`}
                          key={`a-search ${real.id}`}
                        >
                          {deal}
                        </NavLink>,
                      ]}
                    </li>
                  </div>
                </>
              );
            }
            use = res;

            setUse(use);
          });
        });
      }
    });
  };
  // if (use) console.log(use);

  return (
    <>
      <div className="searchBar-main__container">
        <div className="searchBar-input__container">
          <input
            id="location-input__search"
            label="Location"
            placeholder="Explore Communities"
            onChange={(e) => {
              let value = e.target.value.length;

              if (value < 3) {
                setUse([]);
              } else {
                setUse(searchBar(use));
              }
            }}
          ></input>
          <div className="search-bar" id="search">
            <div className="search-input">
              <div className="autocom-box">
                <ul id="serversList">{use}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
