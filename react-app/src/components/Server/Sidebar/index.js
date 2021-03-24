import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import {
    Avatar,
    IconButton,
    MenuItem,
    Popper,
    Paper,
    MenuList,
    ClickAwayListener,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector, useDispatch } from 'react-redux';
import EditServerForm from '../../EditServerForm';
import { updateExistingServer } from '../../../store/server';
import { findExistingChannel } from '../../../store/channel';
import ConfirmDelete from '../../ConfirmDelete';
import ChannelForm from '../../ChannelForm';

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

const SimpleAccordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        backgroundColor: 'inherit',
        color: 'white',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
})(Accordion);

const SimpleAccordionSummary = withStyles({
    root: {
        backgroundColor: 'inherit',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(AccordionSummary);

const SimpleAccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(AccordionDetails);

function Sidebar() {
    const [showServerModal, setShowServerModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const server = useSelector((state) => state.server);

    useEffect(() => {
        setIsLoaded(true);
    }, [server]);

    const openDeleteModal = () => {
        setShowDeleteModal((prev) => !prev);
        setOpen(false);
    };

    const openServerModal = () => {
        setShowServerModal((prev) => !prev);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleDescription = () => {
        setShowDescription((prev) => !prev);
    };

    const openChannelModal = () => {
        setShowChannelModal((prev) => !prev);
    };

    const handleEditServer = (serverId) => {
        dispatch(updateExistingServer(serverId));
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>{server.name}</h3>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleToggle}
                    ref={anchorRef}
                >
                    <ExpandMoreIcon style={{ color: 'white' }} />
                </IconButton>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{
                        positon: 'relative',
                        zIndex: 2,
                    }}
                >
                    <Paper
                        style={{
                            backgroundColor: '#18191C',
                            marginBottom: '3px',
                        }}
                    >
                        <ClickAwayListener onClickAway={handleClose}>
                            <CustomMenuList style={{ color: 'white' }}>
                                <CustomMenuItem onClick={openServerModal}>
                                    <div className="serverModalCategory">
                                        Edit
                                    </div>
                                    <EditIcon style={{ color: 'white' }} />
                                </CustomMenuItem>
                                <CustomMenuItem onClick={openDeleteModal}>
                                    <div className="serverModalCategory">
                                        Delete
                                    </div>
                                    <DeleteIcon style={{ color: 'white' }} />
                                </CustomMenuItem>
                            </CustomMenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <ConfirmDelete
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
                <EditServerForm
                    server={server}
                    showServerModal={showServerModal}
                    setShowServerModal={setShowServerModal}
                />
                <ChannelForm
                    showChannelModal={showChannelModal}
                    setShowChannelModal={setShowChannelModal}
                />
            </div>
            <div className="sidebar__description">
                <SimpleAccordion
                    square
                    expanded={showDescription}
                    onChange={handleDescription}
                >
                    <SimpleAccordionSummary
                        aria-controls="description-content"
                        id="descriptionHeaderContainer"
                        expandIcon={
                            <ExpandMoreIcon style={{ color: 'white' }} />
                        }
                    >
                        <div className="descriptionHeader">Description</div>
                    </SimpleAccordionSummary>
                    <SimpleAccordionDetails>
                        <div className="descriptionContent">
                            {server.description}
                        </div>
                    </SimpleAccordionDetails>
                </SimpleAccordion>
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon
                        className="sidebar__addChannel"
                        onClick={openChannelModal}
                    />
                </div>
                <div className="sidebar__channelsList">
                    <SidebarChannel />
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar />
                <div className="sidebar__profileInfo">
                    <h3>Hussein Profile</h3>
                    <p>#ID</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
