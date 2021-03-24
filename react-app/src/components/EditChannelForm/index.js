import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateExistingChannel } from "../../store/channel";

function EditChannelForm({ showEditChannelModal, setShowEditChannelModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState("");

  const channel = useSelector((state) => state.channel);


    const editChannelModalRef = useRef();
    // close modal when clicking anywhere else
    const closeEditChannelModal = (e) => {
        if (editChannelModalRef.current === e.target) {
            setShowEditChannelModal(false);
            setChannelName(channel.name);
        }
    };

  useEffect(() => {
    setChannelName(channel.name);
  }, [channel]);

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showEditChannelModal) {
        setShowEditChannelModal(false);
        setChannelName(channel.name);
      }
    },
    [showEditChannelModal, setShowEditChannelModal]
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
    opacity: showEditChannelModal ? 1 : 0,
    transform: showEditChannelModal ? `scale(1)` : `scale(0.8)`,
  });


    const handleEditChannel = async (e, updatedName, channelId) => {
        e.preventDefault();

    if (!channelName) {
      setErrors("Channel name cannot be empty!");
      return;
    }

    setErrors("");
    setChannelName("");
    setShowEditChannelModal(false);

    dispatch(updateExistingChannel({ updatedName, channelId }));
    // history.push(`/servers/${server.id}/${newChannel.id}`);
  };


    return showEditChannelModal ? (
        <div
            className="channelModalWrapper"
            ref={editChannelModalRef}
            onClick={closeEditChannelModal}
        >
            <animated.div style={animation}>
                <div className="channelModalContainer">
                    {errors && (
                        <div className="channelFormErrors">{errors}</div>
                    )}
                    <form
                        onSubmit={(e) =>
                            handleEditChannel(e, channelName, channel.id)
                        }
                        className="channelModalForm"
                    >
                        <div className="channelModalFormTitleContainer">
                            <div className="channelModalHeader">
                                Edit Channel
                            </div>
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
                                <button
                                    className="channelModalSubmit"
                                    type="submit"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </animated.div>
        </div>
      </animated.div>
    </div>
  ) : null;
}

export default EditChannelForm;
