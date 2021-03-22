import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import GroupWorkRoundedIcon from "@material-ui/icons/GroupWorkRounded";
import ServerForm from "../../ServerForm";
import "./ServerSidebar.css";
import { fetchUserServers } from "../../../store/userInfo";

function ServerSidebar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userServers = useSelector((state) => state.userServers);
  const loggedInUser = useSelector((state) => state.session);
  useEffect(() => {
    if (loggedInUser) dispatch(fetchUserServers(loggedInUser.id));
  }, [dispatch]);

  function homeButton() {
    history.push("/");
  }
  const [showServerModal, setShowServerModal] = useState(false);

  const openServerModal = () => {
    setShowServerModal((prev) => !prev);
  };

  const handleServerClick = (e) => {
    history.push(`/servers/${e.target.id}`);
    window.location.reload();
  };

  return (
    <div className="ServerSidebar">
      <li>
        <Tooltip title="Home" key="home" placement="right" className="tooltip">
          <IconButton className="home-icon" onClick={homeButton}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <div className="menu-seperator" />

        {/* This is where we will map over the servers for that user and render their pictures */}
        <div className="userServersList">
          {Object.keys(userServers).length > 0 &&
            userServers.map((userServer) => (
              <Tooltip
                title={userServer.name}
                key={userServer.id}
                placement="right"
                className="tooltip"
              >
                <IconButton
                  id={userServer.id}
                  onClick={handleServerClick}
                  className="server-icon"
                >
                  {!userServer.image_url ? (
                    <GroupWorkRoundedIcon id={userServer.id} />
                  ) : (
                    <div className="server-icon">
                      <img src={userServer.image_url} />
                    </div>
                  )}
                </IconButton>
              </Tooltip>
            ))}
        </div>
        {loggedInUser && (
          <Tooltip
            title="Create Server"
            key="create-server"
            placement="right"
            className="tooltip"
          >
            <div>
              <IconButton className="server-icon" onClick={openServerModal}>
                <AddCircleOutlineIcon />
              </IconButton>
              <ServerForm
                showServerModal={showServerModal}
                setShowServerModal={setShowServerModal}
              />
            </div>
          </Tooltip>
        )}
      </li>
    </div>
  );
}

export default ServerSidebar;
