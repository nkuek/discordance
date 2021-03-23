import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import './Server.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Message from './Message';

function Server() {
    return (
        <>
            <div className="serverContainer">
                <Sidebar />
                <Message />
                <Route path={`/servers/:serverId(\\d+)/:channelId(\\d+)`}>
                    <Chat />
                </Route>
            </div>
        </>
    );
}

export default Server;
