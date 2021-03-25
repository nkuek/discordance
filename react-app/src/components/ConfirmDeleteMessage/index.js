import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteExistingMessage } from "../../store/message";
import "../ConfirmDelete/ConfirmDelete.css";
import { deleteExistingChannel } from "../../store/channel";

function ConfirmDeleteMessage({
  newMessage,
  setNewMessage,
  showDeleteMessageModal,
  setShowDeleteMessageModal,
}) {
  // const [deleteMessage, setDeleteMessage] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteModalRef = useRef();
  // close modal when clicking anywhere else
  const closeDeleteMessageModal = (e) => {
    if (deleteModalRef.current === e.target) {
      setShowDeleteMessageModal(false);
    }
  };

  useEffect(() => {
    setNewMessage(false);
  }, [newMessage]);

  const channel = useSelector((state) => state.channel);
  const server = useSelector((state) => state.server);
  const messageId = useSelector((state) => state.message);

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showDeleteMessageModal) {
        setShowDeleteMessageModal(false);
      }
    },
    [showDeleteMessageModal, setShowDeleteMessageModal]
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
    opacity: showDeleteMessageModal ? 1 : 0,
    transform: showDeleteMessageModal ? `scale(1)` : `scale(0.8)`,
  });

  const handleDeleteMessage = (messageId) => {
    dispatch(deleteExistingMessage(messageId));
    setShowDeleteMessageModal(false);
    // setDeleteMessage(true);
    history.push(`/servers/${server.id}/${channel.id}`);
  };

  return showDeleteMessageModal ? (
    <div
      className="serverModalWrapper"
      ref={deleteModalRef}
      onClick={closeDeleteMessageModal}
    >
      <animated.div style={animation}>
        <div className="deleteModalContainer">
          <div className="deleteModalHeader">
            {`Are you sure you want to delete this message?`}
          </div>
          <div className="deleteModalButtons">
            <button
              onClick={() => handleDeleteMessage(messageId)}
              className="confirmDeleteModalButtonYes"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteMessageModal(false)}
              className="confirmDeleteModalButtonNo"
            >
              No
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  ) : null;
}

export default ConfirmDeleteMessage;
