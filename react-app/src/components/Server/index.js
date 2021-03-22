import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Server.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Message from './Message';
import { findExistingServer } from '../../store/server';

function Server() {
    return (
        <div className="serverContainer">
            <Sidebar />
            <Chat />
            <Message />
        </div>
    );
}

export default Server;
