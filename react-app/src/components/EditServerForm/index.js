import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createServer } from "../../store/server";
import { updateExistingServer, findExistingServer } from "../../store/server";
import "./EditServerForm.css";

function EditServerForm({ showServerModal, setShowServerModal, server }) {
  const loggedInUser = useSelector((state) => state.session.user);

  const { serverId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState("");
  //   const [isLoaded, setIsLoaded] = useState(false);
  const serverModalRef = useRef();

  //   useEffect(() => {
  //     dispatch(findExistingServer(serverId));
  //     setIsLoaded(true);
  //   }, [dispatch]);

  // close modal when clicking anywhere else
  const closeServerModal = (e) => {
    if (serverModalRef.current === e.target) {
      setShowServerModal(false);
    }
  };

  // close modal when pressing escape key
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showServerModal) {
        setShowServerModal(false);
      }
    },
    [showServerModal, setShowServerModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setErrors("Server name cannot be empty!");
      return;
    }
    const newServer = await dispatch(
      updateExistingServer({
        admin_id: loggedInUser.id,
        name,
        description,
        isPublic,
        image,
      })
    );
    setName(loggedInUser && `${loggedInUser.username}'s server`);
    setDescription("");
    setIsPublic("true");
    setImage("");
    setErrors("");
    setShowServerModal(false);
    history.push(`/servers/${newServer.id}`);
  };

  // Modal animations from react-spring
  const animation = useSpring({
    config: {
      duration: 150,
    },
    opacity: showServerModal ? 1 : 0,
    transform: showServerModal ? `scale(1)` : `scale(0.8)`,
  });

  //conditional render with isLoaded
  return showServerModal ? (
    <div
      className="serverModalWrapper"
      ref={serverModalRef}
      onClick={closeServerModal}
    >
      <animated.div style={animation}>
        <div className="serverModalContainer">
          <div className="serverModalFormTitleContainer">
            <div className="serverModalFormTitle">Edit Server</div>
          </div>
          {errors && <div className="serverFormErrors">{errors}</div>}
          <form className="serverModalForm" onSubmit={(e) => onSubmit(e)}>
            <div className="serverModalInputContainer">
              <label htmlFor="name">Server Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={server.name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="serverModalInputContainer">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={server.description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="serverModalInputContainer">
              <label htmlFor="public">Privacy</label>
              <select onChange={(e) => setIsPublic(e.target.value)}>
                <option value="true">Public</option>
                <option value="">Private</option>
              </select>
            </div>
            <div className="serverModalInputContainer">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                placeholder="Image Url"
                value={server.image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="serverModalButtonContainer">
              <button className="serverModalSubmit" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  ) : null;
}

export default EditServerForm;
