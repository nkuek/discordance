import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

function ChatHeader() {
    const [isLoaded, setIsLoaded] = useState(false);
    const channel = useSelector((state) => state.channel);

    useEffect(() => {
        setIsLoaded(true);
    }, [channel]);

    return (
        isLoaded && (
            <div className="chatHeader">
                <div className="chatHeader__left">
                    <h3>
                        <span className="chatHeader__hash">#</span>
                        {channel.name}
                    </h3>
                </div>

                <div className="chatHeader__right">
                    <NotificationsIcon />
                    <EditLocationRoundedIcon />
                    <PeopleAltRoundedIcon />

                    <div className="chatHeader__search">
                        <input placeholder="Search" />
                        <SearchRoundedIcon />
                    </div>

                    <InboxIcon />
                    <HelpRoundedIcon />
                </div>
            </div>
        )
    );
}

export default ChatHeader;
