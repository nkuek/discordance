import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findExistingServer } from '../../../store/server';
import './SidebarChannel.css';
import ChannelDropdown from '../../ChannelDropdown';

function SidebarChannel() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const server = useSelector((state) => state.server);
    const channel = useSelector((state) => state.channel);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (isLoaded) dispatch(findExistingServer(server.id));
    }, [channel]);
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
                    </NavLink>
                    {user &&
                    server.users
                        .map((serverUser) => serverUser.username)
                        .includes(user.username) ? (
                        <ChannelDropdown />
                    ) : null}
                </div>
            ))}
        </>
    ) : null;
}

export default SidebarChannel;
