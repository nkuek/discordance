import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChannel } from "../../store/channel";
import "./ChannelForm.css";

function ChannelForm({ showChannelModal, setShowChannelModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [channelName, setChannelName] = useState("");
  const [serverId, setServerId] = useState("");
  const [errors, setErrors] = useState("");

  const channelModalRef = useRef();
  // close modal when clicking anywhere else
  const closeChannelModal = (e) => {
    if (channelModalRef.current === e.target) {
      setShowChannelModal(false);
    }
  };

  const server = useSelector((state) => state.server);

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showChannelModal) {
        setShowChannelModal(false);
      }
    },
    [showChannelModal, setShowChannelModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // Modal animations from react-spring
  const animation = useSpring({
    config: {
      duration: 150,
    },
    opacity: showChannelModal ? 1 : 0,
    transform: showChannelModal ? `scale(1)` : `scale(0.8)`,
  });

  const handleChannelServer = async (e, name, serverId) => {
    e.preventDefault();

    if (!channelName) {
      setErrors("Channel name cannot be empty!");
      return;
    }

    setErrors("");
    setChannelName("");
    setShowChannelModal(false);
    setServerId(serverId);

    const newChannel = await dispatch(createChannel(name, serverId));
    history.push(`/servers/${server.id}/${newChannel.id}`);
  };

  return showChannelModal ? (
    <div
      className="channelModalWrapper"
      ref={channelModalRef}
      onClick={closeChannelModal}
    >
      <animated.div style={animation}>
        <div className="channelModalContainer">
          {errors && <div className="channelFormErrors">{errors}</div>}
          <form
            onSubmit={(e) => handleChannelServer(e, channelName, server.id)}
            className="channelModalForm"
          >
            <div className="channelModalFormTitleContainer">
              <div className="channelModalHeader">Create a Channel</div>
            </div>
            <div className="channelModalInputContainer">
              <label htmlFor="channelName">Channel Name</label>
              <input
                name="channelName"
                type="text"
                placeholder="Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              ></input>
              <div className="channelModalButtonContainer">
                <button className="channelModalSubmit" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  ) : null;
}

export default ChannelForm;
