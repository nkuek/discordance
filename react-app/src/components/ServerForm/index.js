import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServer } from "../../store/server";
import "./ServerForm.css";

function ServerForm({ showServerModal, setShowServerModal }) {
  const loggedInUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(
    loggedInUser && `${loggedInUser.username}'s server`
  );
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const [image, setImage] = useState("");
  const [serverCategory, setServerCategory] = useState("Gaming");
  const [errors, setErrors] = useState("");
  const serverModalRef = useRef();

  // aws
  const [awsImage, awsSetImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea

    setImageLoading(true);
    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push("/images");
    } else {
      setImageLoading(false);
      console.log("error");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // aws ends --------------------

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
      createServer({
        admin_id: loggedInUser.id,
        name,
        serverCategory,
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

  return showServerModal ? (
    <div
      className="serverModalWrapper"
      ref={serverModalRef}
      onClick={closeServerModal}
    >
      <animated.div style={animation}>
        <div className="serverModalContainer">
          <div className="serverModalFormTitleContainer">
            <div className="serverModalFormTitle">Create a Server</div>
          </div>
          {errors && <div className="serverFormErrors">{errors}</div>}
          <form
            className="serverModalForm"
            onSubmit={(e) => onSubmit(e)}
            onSubmit={handleSubmit}
          >
            <div className="serverModalInputContainer">
              <label htmlFor="name">Server Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="serverModalInputContainer">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
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
              <label htmlFor="serverCategory">Category</label>
              <select onChange={(e) => setServerCategory(e.target.value)}>
                <option value="gaming">Gaming</option>
                <option value="music">Music</option>
                <option value="education">Education</option>
                <option value="science">Science & Tech</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            <div className="serverModalInputContainer">
              <label htmlFor="image">Image</label>
              {/* <input
                type="text"
                name="image"
                placeholder="Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input> */}
              <input type="file" accept="image/*" onChange={updateImage} />
              {imageLoading && <p>Loading...</p>}
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

export default ServerForm;
