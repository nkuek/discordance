import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/auth';

const LogoutButton = ({ setAuthenticated }) => {
    const history = useHistory();
    const onLogout = async (e) => {
        await logout();
        setAuthenticated(false);
        localStorage.removeItem('loggedInUser');
        history.push('/');
    };

    return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
