import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingMessage } from "../../store/message";
import { findExistingChannel } from "../../store/channel";
import "./EditMessageForm.css";

function EditMessageForm({ showEditMessageModal, setShowEditMessageModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const channel = useSelector((state) => state.channel);
  const server = useSelector((state) => state.server);
  const messageData = useSelector((state) => state.message);

  useEffect(() => {
    if (channel.message) dispatch(findExistingChannel(channel.id));
  }, [channel]);

  const editMessageModalRef = useRef();
  // close modal when clicking anywhere else
  const closeEditMessageModal = (e) => {
    if (editMessageModalRef.current === e.target) {
      setShowEditMessageModal(false);
      setMessage(messageData.message);
      setErrors("");
    }
  };

  // useEffect(() => {
  //   setMessage(messageData.message);
  // }, [message]);

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showEditMessageModal) {
        setShowEditMessageModal(false);
        // setMessageName(message.name);
        setErrors("");
      }
    },
    [showEditMessageModal, setShowEditMessageModal, messageData]
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
    opacity: showEditMessageModal ? 1 : 0,
    transform: showEditMessageModal ? `scale(1)` : `scale(0.8)`,
  });

  const handleEditMessage = async (e, updatedMessage, messageId) => {
    e.preventDefault();

    if (!message) {
      setErrors("Message cannot be empty!");
      return;
    }

    setErrors("");
    setMessage("");
    setShowEditMessageModal(false);

    dispatch(updateExistingMessage({ updatedMessage, messageId }));
    history.push(`/servers/${server.id}/${channel.id}`);
  };

  return showEditMessageModal ? (
    <div
      style={{ zIndex: 3 }}
      className="messageModalWrapper"
      ref={editMessageModalRef}
      onClick={closeEditMessageModal}
    >
      <animated.div style={animation}>
        <div className="messageModalContainer">
          <form
            onSubmit={(e) => handleEditMessage(e, message, messageData.id)}
            className="messageModalForm"
          >
            <div className="messageModalFormTitleContainer">
              <div className="messageModalHeader">Edit Message</div>
            </div>
            {errors && <div className="messageFormErrors">{errors}</div>}
            <div className="messageModalInputContainer">
              <label htmlFor="messageName">Message</label>
              <input
                name="messageName"
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
              <div className="messageModalButtonContainer">
                <button className="messageModalSubmit" type="submit">
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  ) : null;
}

export default EditMessageForm;
