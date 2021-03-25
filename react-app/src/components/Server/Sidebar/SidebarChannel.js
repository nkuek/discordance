import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findExistingServer } from '../../../store/server';
import './SidebarChannel.css';
import {
    MenuList,
    MenuItem,
    Popper,
    Paper,
    ClickAwayListener,
} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/styles';
import ConfirmDeleteChannel from '../../ConfirmDeleteChannel';
import EditChannelForm from '../../EditChannelForm';
import ChannelDropdown from '../../ChannelDropdown';

const CustomMenuList = withStyles({
    root: {
        width: '150px',
        boxShadow: '3px 3px 3px #28292E',
        backgroundColor: '#18191C',
        borderRadius: '5px',
    },
})(MenuList);

const CustomMenuItem = withStyles({
    root: {
        '&:hover': {
            backgroundColor: '#7289DA',
            borderRadius: '5px',
        },
        padding: '5px 10px',
        margin: '0px 6px',
        display: 'flex',
        justifyContent: 'space-between',
    },
})(MenuItem);

const CustomIconButton = withStyles({
    root: {
        // display: 'none',
        padding: '6px',
        position: 'relative',
        zIndex: 0,
    },
})(IconButton);

function SidebarChannel() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const server = useSelector((state) => state.server);
    const channel = useSelector((state) => state.channel);

    const handleClick = () => {
        const chatBox = document.querySelector('.chat__messages');
    };

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
                        onClick={handleClick}
                        className="sidebarChannelLink"
                        to={`/servers/${server.id}/${channel.id}`}
                    >
                        <div className="channelNameAndHash">
                            <span className="sidebarChannel__hash">#</span>
                            <div className="channelName">{channel.name}</div>
                        </div>
                    </NavLink>
                    <ChannelDropdown />
                </div>
            ))}
        </>
    ) : null;
}

export default SidebarChannel;
