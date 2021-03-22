import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/session';
import './LogoutButton.css';
import { resetUserServers } from '../../../store/userInfo';

const LogoutButton = ({ setAuthenticated }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogout = async (e) => {
        await dispatch(logout());
        dispatch(resetUserServers());
        setAuthenticated(false);
        history.push('/');
    };

    return (
        <button className="LogoutModalSubmit" onClick={onLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
