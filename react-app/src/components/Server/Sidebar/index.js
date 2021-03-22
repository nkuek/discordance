import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import {
  Avatar,
  IconButton,
  MenuItem,
  Popper,
  Paper,
  MenuList,
  ClickAwayListener,
} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector, useDispatch } from "react-redux";
import EditServerForm from "../../EditServerForm";
import {
  deleteExistingServer,
  updateExistingServer,
} from "../../../store/server";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [showServerModal, setShowServerModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const server = useSelector((state) => state.server);

  const openServerModal = () => {
    setShowServerModal((prev) => !prev);
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

  const handleDeleteServer = (serverId) => {
    dispatch(deleteExistingServer(serverId));
    history.push("/");
  };

  const handleEditServer = (serverId) => {
    dispatch(updateExistingServer(serverId));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>{server.name}</h3>
        {/* <ExpandMoreIcon /> */}
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleToggle}
          ref={anchorRef}
        >
          <ExpandMoreIcon style={{ color: "white" }} />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>
                <MenuItem onClick={() => handleDeleteServer(server.id)}>
                  Delete
                </MenuItem>
                <MenuItem onClick={openServerModal}>Edit</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
        <EditServerForm
          server={server}
          showServerModal={showServerModal}
          setShowServerModal={setShowServerModal}
        />
      </div>
      <div className="sidebar__description">{server.description}</div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon className="sidebar__addChannel" />
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
