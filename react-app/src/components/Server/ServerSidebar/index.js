import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ServerForm from '../../ServerForm';
import './ServerSidebar.css';

function ServerSidebar() {
    const history = useHistory();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    function homeButton() {
        history.push('/');
    }
    const [showServerModal, setShowServerModal] = useState(false);

    const openServerModal = () => {
        setShowServerModal((prev) => !prev);
    };

    return (
        <div className="ServerSidebar">
            <list>
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
            </list>
        </div>
    );
}

export default ServerSidebar;
