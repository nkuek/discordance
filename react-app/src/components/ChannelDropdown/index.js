import React, { useState, useRef } from 'react';
import {
    MenuList,
    MenuItem,
    Popper,
    Paper,
    IconButton,
    ClickAwayListener,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDeleteChannel from '../ConfirmDeleteChannel';
import EditChannelForm from '../EditChannelForm';

const CustomMenuList = withStyles({
    root: {
        width: '150px',
        boxShadow: '3px 3px 3px #28292E',
        backgroundColor: '#18191C',
        borderRadius: '5px',
        position: 'relative',
        zIndex: 2,
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
        position: 'relative',
        zIndex: 2,
    },
})(MenuItem);

const CustomIconButton = withStyles({
    root: {
        display: 'none',
        padding: '6px',
        position: 'relative',
        zIndex: 0,
        boxSizing: 'border-box',
    },
})(IconButton);

const ChannelDropdown = () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
    const [showEditChannelModal, setShowEditChannelModal] = useState(false);

    const openEditChannelModal = (e) => {
        setShowEditChannelModal((prev) => !prev);
        setOpen(false);
    };
    const openDeleteChannelModal = (e) => {
        setShowDeleteChannelModal((prev) => !prev);
        setOpen(false);
    };

    const handleToggle = (e) => {
        // e.stopPropagation();
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <CustomIconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => handleToggle(e)}
                ref={anchorRef}
            >
                <SettingsIcon style={{ color: 'white' }} />
            </CustomIconButton>
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
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <CustomMenuList style={{ color: 'white' }}>
                            <CustomMenuItem
                                onClick={(e) => openEditChannelModal(e)}
                            >
                                <div className="serverModalCategory">Edit</div>
                                <EditIcon style={{ color: 'white' }} />
                            </CustomMenuItem>
                            <CustomMenuItem
                                onClick={(e) => openDeleteChannelModal(e)}
                            >
                                <div className="serverModalCategory">
                                    Delete
                                </div>
                                <DeleteIcon style={{ color: 'white' }} />
                            </CustomMenuItem>
                        </CustomMenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
            <ConfirmDeleteChannel
                showDeleteChannelModal={showDeleteChannelModal}
                setShowDeleteChannelModal={setShowDeleteChannelModal}
            />
            <EditChannelForm
                showEditChannelModal={showEditChannelModal}
                setShowEditChannelModal={setShowEditChannelModal}
            />
        </>
    );
};

export default ChannelDropdown;