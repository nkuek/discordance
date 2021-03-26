import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
// import LoginForm from "./components/auth/LoginForm/index";
// import SignUpForm from "./components/auth/SignUpForm/index";

import HomePage from "./components/HomePage/index";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute/index";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/auth";
import Server from "./components/Server";
import ServerSidebar from "./components/Server/ServerSidebar";

import { fetchUserServers } from "./store/userInfo";

import GamePage from "./components/HomePage/gaming.js";
import Music from "./components/HomePage/music.js";
import Edu from "./components/HomePage/education.js";
import Entertainment from "./components/HomePage/enter.js";
import Science from "./components/HomePage/science.js";
import Home from "./components/HomePage/home.js";

// --------------------------
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const user = authenticate();
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
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path="/users/:userId"
            exact={true}
            authenticated={authenticated}
          >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
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
          <Route path="/servers/:serverId(\d+)">
            <Server />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
