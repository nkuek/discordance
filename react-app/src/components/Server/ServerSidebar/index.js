import React from "react";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./ServerSidebar.css";

function ServerSidebar() {
  const history = useHistory();

  function homeButton() {
    history.push("/");
  }

  return (
    <div className="ServerSidebar">
      <list>
        <Tooltip title="Home" key="home" placement="right" className="tooltip">
          <IconButton className="home-icon" onClick={homeButton}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <div className="menu-seperator" />

        {/* This is where we will map over the servers for that user and render their pictures */}

        <Tooltip
          title="Create Server"
          key="create-server"
          placement="right"
          className="tooltip"
        >
          <IconButton
            className="server-icon"
            // onClick={OPEN SERVER MODAL}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </list>
    </div>
  );
}

export default ServerSidebar;
