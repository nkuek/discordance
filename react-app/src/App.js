import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from "./components/auth/LoginForm/index";
// import SignUpForm from "./components/auth/SignUpForm/index";
import NavBar from './components/NavBar/index';
import ProtectedRoute from './components/auth/ProtectedRoute/index';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/auth';
import Server from './components/Server';
import ServerSidebar from './components/Server/ServerSidebar';

import * as sessionActions from './store/session';

function App() {
    const dispatch = useDispatch();

    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const user = await authenticate();
        if (!user.errors) {
            dispatch(sessionActions.restoreUser());
            setAuthenticated(true);
        }
        setLoaded(true);
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <NavBar
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
            />
            <div className="mainContent">
                <ServerSidebar />
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
                    <ProtectedRoute
                        path="/"
                        exact={true}
                        authenticated={authenticated}
                    >
                        <h1>My Home Page</h1>
                    </ProtectedRoute>
                    <Route path="/servers/:serverId">
                        <Server />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
