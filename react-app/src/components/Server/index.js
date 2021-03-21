import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Server.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Message from './Message';
import { findExistingServer } from '../../store/server';

function Server() {
    const { serverId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findExistingServer(serverId));
    }, [dispatch]);

    return (
        <div className="serverContainer">
            <Sidebar />
            <Chat />
            <Message />
        </div>
    );
}

export default Server;
