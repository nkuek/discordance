import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findExistingServer } from "../../../store/server";
import "./SidebarChannel.css";

function SidebarChannel() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [serverId, setServerId] = useState('')
  const server = useSelector((state) => state.server);

  useEffect(() => {
    dispatch(findExistingServer(server?.id));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(server).length > 0) setIsLoaded(true);
  }, [server]);

  return isLoaded ? (
    <>
      {server.channels.map((channel) => (
        <div key={channel.id} className="sidebarChannel">
          <h4>
            <span className="sidebarChannel__hash">#</span>
            {channel.name}
          </h4>
        </div>
      ))}
    </>
  ) : null;
}

export default SidebarChannel;
