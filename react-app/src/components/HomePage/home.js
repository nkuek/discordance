import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Discover from "./discover";

import * as serverActions from '../../store/publicServer';
import './Homepage.css';
import SearchBar from '../SearchBar';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(serverActions.findPublicServers());
    }, [dispatch]);

    const user = useSelector((state) => state?.session.user);
    const publicServers = useSelector((state) => state?.publicServer);

    return (
        <>
            {/* home page */}
            <div className="home-div__container">
                <div className="banner-div__container">
                    <img
                        src="https://discord.com/assets/3e0acf6d69894a5d20deb7c513cd1412.svg"
                        alt="home-banner"
                    />
                    <div className="banner-text__container">
                        <h1>Find your community on Discordance</h1>
                        <h2>
                            From gaming, to music, to learning, there's a place
                            for you.
                        </h2>
                        <SearchBar />
                    </div>
                </div>

                <div className="main-servers__container">
                    <h1 className="h1-communities">Featured communities</h1>
                    <div className="servers-containers__home">
                        {Object.values(publicServers).map((el) => (
                            <div className="server-div__container" key={el?.id}>
                                <NavLink to={`servers/${el?.id}`}>
                                    <div className="img-div__container">
                                        <img
                                            src={
                                                !el.image_url
                                                    ? 'https://techjobstour.com/wp-content/uploads/2017/05/appacademylogo.png'
                                                    : el.image_url
                                            }
                                            alt="server-profile__image"
                                        />
                                    </div>
                                    <div className="server-div__name">
                                        {' '}
                                        {el?.name}
                                    </div>
                                    <div className="server-div__description">
                                        {' '}
                                        {el?.description}
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*ends home page */}
        </>
    );
}

export default Home;
