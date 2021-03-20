import React from "react";
import "./Server.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Message from "./Message";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
      <Message />
    </div>
  );
}

export default App;
