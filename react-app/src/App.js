import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm/index';
// import SignUpForm from "./components/auth/SignUpForm/index";

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

function App() {
    const dispatch = useDispatch();

    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const user = await authenticate();
        if (!user.errors) {
            dispatch(sessionActions.restoreUser());
            setAuthenticated(true);
            dispatch(fetchUserServers(user.id));
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
                        ) : null}
                        <Route path="/developers">
                            <Developers />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

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
