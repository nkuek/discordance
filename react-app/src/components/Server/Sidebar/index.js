import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import EditProfileImageForm from '../../auth/EditProfileImageForm/EditProfileImageForm';
import Modal from 'react-modal';

// Mui Icons
import {
    ExpandMore as ExpandMoreIcon,
    Mic as MicIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Headset as HeadsetIcon,
    Call as CallIcon,
    InfoOutlined as InfoOutlinedIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    SignalCellularAlt as SignalCellularAltIcon,
} from '@material-ui/icons';

// Mui Functions
import {
    IconButton,
    MenuItem,
    Popper,
    Paper,
    MenuList,
    ClickAwayListener,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    withStyles,
} from '@material-ui/core';

import EditServerForm from '../../EditServerForm';
// import { updateExistingServer } from "../../../store/server";
import SidebarChannel from './SidebarChannel';
import ConfirmDelete from '../../ConfirmDelete';
import ChannelForm from '../../ChannelForm';
import { findExistingServer } from '../../../store/server';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '20px',
    },
};

Modal.setAppElement('#root');

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
    const [openSignUpModal, setIsOpenSignUpModal] = useState(false);
    const [showServerModal, setShowServerModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChannelModal, setShowChannelModal] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [joinedServers, setJoinedServers] = useState('');
    const anchorRef = React.useRef(null);

    const user = useSelector((state) => state.session.user);
    const server = useSelector((state) => state.server);
    const userServers = useSelector((state) => state.userServers);
    const channel = useSelector((state) => state.channel);

    useEffect(() => {
        if (Object.keys(server).length > 0) {
            setIsLoaded(true);
        }
    }, [server]);

    useEffect(() => {
        if (Object.keys(userServers).length > 0)
            setJoinedServers(userServers.map((userServer) => userServer.name));
    }, [userServers]);

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

    function openModalSignUp() {
        setIsOpenSignUpModal(true);
    }

    function closeModalSignUp() {
        setIsOpenSignUpModal(false);
    }

    return (
        isLoaded && (
            <div className="sidebar">
                <div className="sidebar__top">
                    <div className="serverHeader">
                        <div className="serverNameAndDropdown">
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
                        </div>
                        {joinedServers.includes(server.name) ? null : (
                            <div className="joinNowButtonContainer">
                                <button class="joinNowButton">
                                    Join Server
                                </button>
                            </div>
                        )}
                    </div>
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
                                        <DeleteIcon
                                            style={{ color: 'white' }}
                                        />
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
                    <div onClick={openModalSignUp}>
                        {!user || user.profile_URL === undefined ? (
                            <Avatar />
                        ) : (
                            <div className="profile__image--container">
                                <div className="label">
                                    <img
                                        className="profile__image"
                                        src={`${user.profile_URL}`}
                                        alt="profile-server"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="sidebar__profileInfo">
                        <h3>{user && `${user.username}`}</h3>
                        <p>{user && `# ${user.id}`}</p>
                    </div>
                    <div className="sidebar__profileIcons">
                        <MicIcon />
                        <HeadsetIcon />
                        <SettingsIcon />
                    </div>
                </div>
                <Modal
                    isOpen={openSignUpModal}
                    onRequestClose={closeModalSignUp}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <EditProfileImageForm closeModalSignUp={closeModalSignUp} />
                </Modal>
            </div>
        )
    );
}

export default Sidebar;
