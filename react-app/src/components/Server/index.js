import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import "./Server.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Message from "./Message";
import ServerSidebar from "./ServerSidebar";
import { findExistingServer } from "../../store/server";

function Server() {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const server = useSelector((state) => state.server);

  useEffect(() => {
    dispatch(findExistingServer(serverId));
    setIsLoading(false);
  }, [dispatch]);

  return isLoading || !server ? (
    <CircleLoader size={500} />
  ) : (
    <div className="serverContainer">
      <ServerSidebar />
      <Sidebar server={server} />
      <Chat />
      <Message />
    </div>
  );
}

export default Server;
