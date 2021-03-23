import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findExistingServer } from '../../../store/server';
import './SidebarChannel.css';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import EditDeleteDropDown from '../../EditDeleteDropdown';

function SidebarChannel() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const server = useSelector((state) => state.server);
    const channel = useSelector((state) => state.channel);

    useEffect(() => {
        if (Object.keys(server).length > 0)
            dispatch(findExistingServer(server?.id));
    }, [dispatch, channel]);

    useEffect(() => {
        if (Object.keys(server).length > 0) setIsLoaded(true);
    }, [server]);

    return isLoaded ? (
        <>
            {server?.channels.map((channel) => (
                <div key={channel.id} className="sidebarChannel">
                    <NavLink
                        className="sidebarChannelLink"
                        to={`/servers/${server.id}/${channel.id}`}
                    >
                        <div className="channelNameAndHash">
                            <span className="sidebarChannel__hash">#</span>
                            <div className="channelName">{channel.name}</div>
                        </div>

                        <EditDeleteDropDown />
                    </NavLink>
                </div>
            ))}
        </>
    ) : null;
}

export default SidebarChannel;
