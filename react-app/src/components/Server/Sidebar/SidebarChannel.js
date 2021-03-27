import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SidebarChannel.css';
import ChannelDropdown from '../../ChannelDropdown';
import { findExistingServer } from '../../../store/server';

function SidebarChannel() {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const server = useSelector((state) => state.server);
    const channel = useSelector((state) => state.channel);

    useEffect(() => {
        if (Object.keys(server).length > 0) setIsLoaded(true);
    }, [server]);

    useEffect(() => {
        if (isLoaded) dispatch(findExistingServer(server.id));
    }, [channel]);

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
                    </NavLink>
                    <ChannelDropdown />
                </div>
            ))}
        </>
    ) : null;
}

export default SidebarChannel;
