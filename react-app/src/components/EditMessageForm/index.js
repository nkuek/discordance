import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
// import { updateExistingChannel } from "../../store/channel";
import "./EditMessageForm.css";

function EditMessageForm({ showEditMessageModal, setShowEditMessageModal }) {
  const dispatch = useDispatch();
  const [messageName, setMessageName] = useState("");
  const [errors, setErrors] = useState("");

  const channel = useSelector((state) => state.channel);

  const editMessageModalRef = useRef();
  // close modal when clicking anywhere else
  const closeEditMessageModal = (e) => {
    if (editMessageModalRef.current === e.target) {
      setShowEditMessageModal(false);
      //   setMessageName(message.name);
      setErrors("");
    }
  };

  //   useEffect(() => {
  // setMessageName(message.name);
  //   }, [message]);

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showEditMessageModal) {
        setShowEditMessageModal(false);
        // setMessageName(message.name);
        setErrors("");
      }
    },
    [
      showEditMessageModal,
      setShowEditMessageModal,
      // message
    ]
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

  //   const handleEditChannel = async (e, updatedName, channelId) => {
  //     if (!channelName) {
  //       setErrors("Channel name cannot be empty!");
  //       return;
  //     }

  //     setErrors("");
  //     setChannelName("");
  //     setShowEditChannelModal(false);

  //     dispatch(updateExistingChannel({ updatedName, channelId }));
  //     // history.push(`/servers/${server.id}/${newChannel.id}`);
  //   };

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
            // onSubmit={(e) => handleEditChannel(e, channelName, channel.id)}
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
                value={messageName}
                onChange={(e) => setMessageName(e.target.value)}
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
