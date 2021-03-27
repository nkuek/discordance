import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Modal from "react-modal";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";

import Discover from './discover';

import * as serverActions from '../../store/publicServer';
import './Homepage.css';
import SearchBar from '../SearchBar';

import modalAuth from "./modalAuth.js";

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#2c2f33",
        borderColor: "#2f3135",
    },
};

Modal.setAppElement("#root");


function HomePage({authenticated, setAuthenticated}) {

  const dispatch = useDispatch();
    const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
    const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);

    //   const userServers = useSelector((state) => state?.userServers);
    //   const loggedInUser = useSelector((state) => state?.session.user);
    //   const server = useSelector((state) => state.server);

    // debugger;

    function openModalLogin() {
        setIsOpenLogin(true);
    }

    function openModalSignUp() {
        setIsOpenSignUp(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModalLogin() {
        setIsOpenLogin(false);
    }

    function closeModalSignUp() {
        setIsOpenSignUp(false);
    }


    useEffect(() => {
        dispatch(serverActions.findPublicServers());
    }, [dispatch]);

    const user = useSelector((state) => state?.session.user);
    const publicServers = useSelector((state) => state?.publicServer);

    return (
        <>  
            <Discover />
            {/* home page */}
            <div className="home-div__container">
                <div className="banner-div__container">
                    <img
                        src="https://discord.com/assets/3e0acf6d69894a5d20deb7c513cd1412.svg"
                        alt="home-banner"
                    />
                    <div className="banner-text__container">
                        <SearchBar />
                        <h1>Find your community on Discordance</h1>
                        <h2>
                            From gaming, to music, to learning, there's a place
                            for you.
                        </h2>
                    </div>
                </div>

                <div className="main-servers__container">
                    <h1 className="h1-communities">Featured communities</h1>
                    <div className="servers-containers__home">
                        {Object.values(publicServers).map((el) => (
                            <div className="server-div__container" key={el?.id}>
                                <NavLink onClick={openModalLogin} to={user ? `servers/${el?.id}` : '/discover'}>
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
                        <Modal
                        isOpen={modalIsOpenLogin}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalLogin}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >
                        <LoginForm
                            setIsOpenLogin={setIsOpenLogin}
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                            closeModalLogin={closeModalLogin}
                            openModalSignUp={openModalSignUp}
                        />
                        </Modal>
                        <Modal
                        isOpen={modalIsOpenSignUp}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalSignUp}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >
                        <SignUpForm
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                            closeModalSignUp={closeModalSignUp}
                            openModalLogin={openModalLogin}
                        />
                        </Modal>
                    </div>
                </div>
            </div>
            {/*ends home page */}
        </>
    );

}

export default HomePage;
