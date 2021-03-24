import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import EditChannelForm from '../EditChannelForm';
import { withStyles } from '@material-ui/styles';
import ConfirmDeleteChannel from '../ConfirmDeleteChannel';
import {
    IconButton,
    MenuItem,
    Popper,
    Paper,
    MenuList,
    ClickAwayListener,
} from '@material-ui/core';

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

const CustomIconButton = withStyles({
    root: {
        display: 'none',
    },
})(IconButton);

const EditDeleteDropDown = () => {
    const anchorRef = useRef(null);
    const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
    const [showEditChannelModal, setShowEditChannelModal] = useState(false);
    const [open, setOpen] = useState(false);

    const channel = useSelector((state) => state.channel);

    const openEditChannelModal = () => {
        setShowEditChannelModal((prev) => !prev);
        setOpen(false);
    };
    const openDeleteChannelModal = () => {
        setShowDeleteChannelModal((prev) => !prev);
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

    return (
        <div>
            <CustomIconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleToggle}
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
                    }}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <CustomMenuList style={{ color: 'white' }}>
                            <CustomMenuItem onClick={openEditChannelModal}>
                                <div className="serverModalCategory">Edit</div>
                                <EditIcon style={{ color: 'white' }} />
                            </CustomMenuItem>
                            <CustomMenuItem onClick={openDeleteChannelModal}>
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
        </div>
    );
};
export default EditDeleteDropDown;
