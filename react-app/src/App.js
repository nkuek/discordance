import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, NavLink, Route,Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import LoginForm from './components/auth/LoginForm/index';
import SignUpForm from "./components/auth/SignUpForm/index";
import LogoutButton from "./components/auth/LogoutButton/index";

import HomePage from './components/HomePage/index';
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute/index';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/auth';
import Server from './components/Server';
import ServerSidebar from './components/Server/ServerSidebar';

import { fetchUserServers } from './store/userInfo';

import GamePage from './components/HomePage/gaming.js';
import Music from './components/HomePage/music.js';
import Edu from './components/HomePage/education.js';
import Entertainment from './components/HomePage/enter.js';
import Science from './components/HomePage/science.js';
import Home from './components/HomePage/home.js';
import Developers from './components/Developers/Developers';
// import { fetchUserServers } from "./store/userInfo";

// aws
// import UploadPicture from "./components/FileUpload/UploadPicture";
// import ViewImages from "./components/FileUpload/ViewImages";

// --------------------------
import * as sessionActions from './store/session';

import Sidebar from './components/Server/Sidebar';


const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 5,
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
        border: "none",
    },
};

Modal.setAppElement("#root");

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: '14px',
                backgroundColor: 'rgb(24, 25, 28)',
            },
            arrow: {
                color: 'rgb(24, 25, 28)',
            },
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
    },
});


export default function App() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [modalIsOpenLogin, setIsOpenLogin] = useState(true);
    const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
    // const [state, setState] = useState(false);

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
    
    function closeModalSignUp() {
        setIsOpenSignUp(false);
    }
    
    function closeModalLogin() {
        setIsOpenLogin(false);
        // setState(true);
        
    }

    // useEffect(() => {
    //     setState(false);
    // }, [state])

    useEffect(async () => {
        const user = await authenticate();
        if (!user.errors) {
            dispatch(sessionActions.restoreUser());
            setAuthenticated(true);
            dispatch(fetchUserServers(user.id));
            setIsOpenLogin(false);
        }
        setLoaded(true);
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    const home = () => {
        if (authenticated === false) {
            return (
                <Route path="/" exact={true}>
                    <Home></Home>
                </Route>
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar
                    authenticated={authenticated}
                    setAuthenticated={setAuthenticated}
                />
                <div className="mainContent">
                    <ServerSidebar
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                    {home()}
                    <Switch>
                        <ProtectedRoute
                            path="/users"
                            exact={true}
                            authenticated={authenticated}
                        >
                            {/* <UsersList /> */}
                        </ProtectedRoute>
                        <ProtectedRoute
                            path="/users/:userId"
                            exact={true}
                            authenticated={authenticated}
                        >
                            {/* <User /> */}
                        </ProtectedRoute>
                        <ProtectedRoute
                            path="/"
                            exact={true}
                            authenticated={authenticated}
                        >
                            <Home></Home>
                        </ProtectedRoute>
                        <Route path="/discover" exact={true}>
                            <HomePage></HomePage>
                        </Route>
                        <Route path="/gaming" exact={true}>
                            <GamePage></GamePage>
                        </Route>
                        <Route path="/music" exact={true}>
                            <Music></Music>
                        </Route>
                        <Route path="/education" exact={true}>
                            <Edu></Edu>
                        </Route>
                        <Route path="/entertainment" exact={true}>
                            <Entertainment></Entertainment>
                        </Route>
                        <Route path="/science&tech" exact={true}>
                            <Science></Science>
                        </Route>
                        {authenticated ? (
                            <Route path="/servers/:serverId(\d+)">
                                <Server />
                            </Route>
                        ) :
                        <NavLink to="/">
                        <Modal
                            isOpen={modalIsOpenLogin}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModalLogin}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <LoginForm
                                setIsOpenLogin={setIsOpenLogin}
                                authenticated={authenticated}
                                setAuthenticated={setAuthenticated}
                                openModalSignUp={openModalSignUp}
                                closeModalLogin={closeModalLogin}
                            />
                        </Modal>
                        <Modal
                            isOpen={modalIsOpenSignUp}
                            onAfterOpen={afterOpenModal}
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
                        </NavLink>}
                        <Route path="/developers">
                            <Developers />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}
