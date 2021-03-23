import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as serverActions from "../../store/server";
import "./Homepage.css";
import SearchBar from "../SearchBar";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serverActions.findPublicServers());
  }, [dispatch]);

  const publicServers = useSelector((state) => state?.server);

  console.log(publicServers[0]?.name);

  return (
    <>
      <div className="homePage-div__container">
        <div className="banner-div__container">
          <img src="https://image.freepik.com/free-psd/furniture-facebook-cover-page-template_237398-164.jpg" />
          <div className="banner-text__container">
            <SearchBar />
            <h1>Find your community on Discordance</h1>
            <h2>From gaming, to music, to learning, there's a place for you</h2>
          </div>
        </div>
        <div className="main-servers__container">
          <h1>Featured communities</h1>
          {Object.values(publicServers).map((el) => (
            <div className="server-div__container" key={el?.id}>
              <NavLink to={`servers/${el?.id}`}>
                <div className="img-div__container">
                  <img src={`${el?.image_url}`} />
                </div>
                <div className="server-div__name"> {el?.name}</div>
                <div className="server-div__description">
                  {" "}
                  {el?.description}
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
