import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useHistory } from 'react-router-dom';
import './Server.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Message from './Message';
import { findExistingServer } from '../../store/server';

function Server() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [firstLoadedRender, setFirstLoadedRender] = useState(false);
    const { serverId } = useParams();

    const server = useSelector((state) => state.server);

    useEffect(() => {
        dispatch(findExistingServer(serverId));
    }, [dispatch]);

    useEffect(() => {
        setIsLoaded(true);
        setFirstLoadedRender(true);
    }, [server]);

    useEffect(() => {
        setFirstLoadedRender(false);
    }, [serverId]);

    // !causes infinite loop beware
    // useEffect(() => {
    //     if (server.channels && server.channels.length > 0 && firstLoadedRender)
    //         history.push(`/servers/${server.id}/${server.channels[0].id}`);
    // }, [firstLoadedRender]);

    return (
        isLoaded && (
            <>
                <div className="serverContainer">
                    <Sidebar />
                    <Message />
                    <Route path={`/servers/:serverId/:channelId`}>
                        <Chat />
                    </Route>
                </div>
            </>
        )
    );
}

export default Server;
