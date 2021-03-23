import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupWorkRoundedIcon from '@material-ui/icons/GroupWorkRounded';
import BlurCircularRoundedIcon from '@material-ui/icons/BlurCircularRounded';
import ServerForm from '../../ServerForm';
import './ServerSidebar.css';
import { fetchUserServers } from '../../../store/userInfo';
import { findExistingServer } from '../../../store/server';

function ServerSidebar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showServerModal, setShowServerModal] = useState(false);
    const [serverId, setServerId] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const server = useSelector((state) => state.server);

    const userServers = useSelector((state) => state.userServers);
    const loggedInUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (serverId) dispatch(findExistingServer(serverId));
    }, [serverId]);

    useEffect(() => {
        dispatch(fetchUserServers(loggedInUser?.id));
        setIsLoaded(true);
    }, [server]);

    function homeButton() {
        history.push('/');
    }

    const openServerModal = () => {
        setShowServerModal((prev) => !prev);
    };

    const handleServerClick = (e, serverId) => {
        e.preventDefault();
        setServerId(serverId);
        history.push(`/servers/${serverId}`);
    };

    return (
        isLoaded && (
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
                    <div className="userServersList">
                        {Object.keys(userServers).length > 0 &&
                            userServers.map((userServer) => (
                                <NavLink
                                    key={userServer.id}
                                    to={`/servers/${userServer.id}`}
                                >
                                    <Tooltip
                                        title={userServer.name}
                                        key={userServer.id}
                                        placement="right"
                                        className="tooltip"
                                    >
                                        <IconButton
                                            onClick={(e) =>
                                                handleServerClick(
                                                    e,
                                                    userServer.id
                                                )
                                            }
                                            className="server-icon"
                                        >
                                            {!userServer.image_url ? (
                                                <BlurCircularRoundedIcon />
                                            ) : (
                                                <div className="server-icon">
                                                    <img
                                                        src={
                                                            userServer.image_url
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            ))}
                    </div>
                    {loggedInUser && (
                        <Tooltip
                            title="Create Server"
                            key="create-server"
                            placement="right"
                            className="tooltip"
                        >
                            <div>
                                <IconButton
                                    className="server-icon"
                                    onClick={openServerModal}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                                <ServerForm
                                    showServerModal={showServerModal}
                                    setShowServerModal={setShowServerModal}
                                />
                            </div>
                        </Tooltip>
                    )}
                </li>
            </div>
        )
    );
}

export default ServerSidebar;
