import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as serverActions from "../../store/publicServer";
import "./Homepage.css";
import SearchBar from "../SearchBar";

function HomePage({ user }) {
  const dispatch = useDispatch();

  // const serverImg = useSelector((state) => state.server.images);
  console.log(user);
  useEffect(() => {
    dispatch(serverActions.findPublicServers());
  }, [dispatch]);

  // aws
  //  const [images, setImages] = useState([]);
  //   useEffect(() => {
  //     (async () => {
  //       const res = await fetch("/api/images");
  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log(data);
  //         setImages(data.images);
  //       } else {
  //         console.log("error");
  //       }
  //     })();
  //   }, []);

  const publicServers = useSelector((state) => state?.publicServer);
  let searchCategories;
  let filteredCategories;
  let categories = [
    "gaming",
    "music",
    "education",
    "science",
    "tech",
    "entertainment",
    "movies",
    "games",
  ];
  let filter = [];
  const publicSer = Object.values(publicServers);
  console.log(publicSer);

  return (
    <>
      <h1 className="discover-title"> Discover </h1>

      {/* here is where we are able to find public servers categories*/}
      {/* I think is a better idea to add a column of categories for the servers */}
      {/* {
        (filteredCategories = publicSer.filter((server) => {
          categories.map((cat) => {
            searchCategories =
              server.name.toLowerCase().includes(cat) ||
              server.description.toLowerCase().includes(cat);
            filter = [searchCategories, server];
            if (searchCategories == true) {
              console.log(filter[1].name);
              return <h1 className="discover-title"> Discover </h1>;
            }
          });
        }))
      } */}
      {/* this is work in progress */}

      <div className="homePage-div__container">
        <div className="banner-div__container">
          <img src="https://discord.com/assets/3e0acf6d69894a5d20deb7c513cd1412.svg" />
          <div className="banner-text__container">
            <SearchBar />
            <h1>Find your community on Discordance</h1>
            <h2>From gaming, to music, to learning, there's a place for you</h2>
          </div>
        </div>
        <div className="main-servers__container">
          <h1>Featured communities</h1>
          <div className="servers-containers">
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
      </div>
    </>
  );
}

export default HomePage;
