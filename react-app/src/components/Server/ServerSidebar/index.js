import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ServerForm from '../../ServerForm';
import './ServerSidebar.css';
import { fetchUserServers } from '../../../store/userInfo';

function ServerSidebar() {
    const dispatch = useDispatch();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        dispatch(fetchUserServers(loggedInUser.id));
    }, [dispatch]);
    const history = useHistory();

    function homeButton() {
        history.push('/');
    }
    const [showServerModal, setShowServerModal] = useState(false);

    const openServerModal = () => {
        setShowServerModal((prev) => !prev);
    };

    return (
        <div className="ServerSidebar">
            <li>
                <Tooltip
                    title="Home"
                    key="home"
                    placement="right"
                    className="tooltip"
                >
                    <IconButton className="home-icon" onClick={homeButton}>
                        <HomeIcon />
                    </IconButton>
                </Tooltip>
                <div className="menu-seperator" />

                {/* This is where we will map over the servers for that user and render their pictures */}

                <Tooltip
                    title="Create Server"
                    key="create-server"
                    placement="right"
                    className="tooltip"
                >
                    {loggedInUser && (
                        <div>
                            <IconButton
                                className="server-icon"
                                onClick={openServerModal}
                            >
                                <ServerForm
                                    showServerModal={showServerModal}
                                    setShowServerModal={setShowServerModal}
                                />
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                    )}
                </Tooltip>
            </li>
        </div>
    );
}

export default ServerSidebar;
