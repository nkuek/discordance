import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ServerForm from './ServerForm';

const NavBar = ({ setAuthenticated }) => {
    const [showServerModal, setShowServerModal] = useState();

    const openServerModal = () => {
        setShowServerModal((prev) => !prev);
    };

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" exact={true} activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/sign-up"
                        exact={true}
                        activeClassName="active"
                    >
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" exact={true} activeClassName="active">
                        Users
                    </NavLink>
                </li>
                <li>
                    <button onClick={openServerModal}>Create a Server</button>
                    <ServerForm
                        showServerModal={showServerModal}
                        setShowServerModal={setShowServerModal}
                    />
                </li>
                <li>
                    <LogoutButton setAuthenticated={setAuthenticated} />
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
