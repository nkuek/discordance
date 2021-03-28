import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/session';
import { resetUserServers } from '../../../store/userInfo';
import './LogoutButton.css';

const LogoutButton = ({ setAuthenticated }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onLogout = async (e) => {
        await dispatch(logout());
        setAuthenticated(false);
        dispatch(resetUserServers());
        history.push('/discover');
    };

    return (
        <button className="LogoutModalSubmit" onClick={onLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
