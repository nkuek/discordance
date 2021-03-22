import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as serverActions from "../../store/server";
import "./Homepage.css";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serverActions.findPublicServers());
  }, [dispatch]);

  const publicServers = useSelector((state) => state?.server);

  console.log(publicServers[0]?.name);

  return (
    <>
      <div>
        <ul>
          {Object.values(publicServers).map((el) => (
            <li key={el?.id}>
              {el?.name}
              {el?.description}
            </li>
          ))}
        </ul>
        HIIII
      </div>
    </>
  );
}

export default HomePage;
