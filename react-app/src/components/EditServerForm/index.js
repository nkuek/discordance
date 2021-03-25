import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateExistingServer, findExistingServer } from '../../store/server';
import './EditServerForm.css';

function EditServerForm({ showServerModal, setShowServerModal }) {
    const loggedInUser = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const server = useSelector((state) => state.server);
    const { serverId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(server.name);
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [serverCategory, setServerCategory] = useState('gaming');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState('');
    const serverModalRef = useRef();

    console.log(server.category);

    useEffect(() => {
        dispatch(findExistingServer(serverId));
        setIsLoaded(true);
    }, [dispatch, serverId]);

    // Yassine
    useEffect(() => {
        setName(server?.name);
        setDescription(server?.description);
        setServerCategory(server?.category);
        setIsPublic(server?.public === true ? 'true' : '');
        setImage(server?.image_url);
    }, [server]);
    // close modal when clicking anywhere else
    const closeServerModal = (e) => {
        if (serverModalRef.current === e.target) {
            setShowServerModal(false);
            setName(server.name);
            setServerCategory(server.category);
            setDescription(server.description);
            setIsPublic(server.public === true ? 'true' : '');
            setImage(server.image_url);
        }
    };

    // close modal when pressing escape key
    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showServerModal) {
                setShowServerModal(false);
                setName(server.name);
                setDescription(server.description);
                setIsPublic(server.public === true ? 'true' : '');
                setServerCategory(server.category);
                setImage(server.image_url);
            }
        },
        [showServerModal, setShowServerModal, server]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);



    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', server.id)
        formData.append('admin_id', loggedInUser.id);
        formData.append('name', name);
        formData.append('serverCategory', serverCategory);
        formData.append('description', description);
        formData.append('isPublic', isPublic);
        formData.append('image', image);

        setImageLoading(true);
        if (!name) {
            setErrors('Server name cannot be empty!');
            return;
        }
        dispatch(
            updateExistingServer(
                formData
            )
        );

        setName(server.name);
        setDescription(server.description);
        setIsPublic(server.public === true ? 'true' : '');
        setImage(server.image_url);
        setErrors('');
        setShowServerModal(false);
        setImageLoading(false);
        history.push(`/servers/${server.id}`);
    };

    // Modal animations from react-spring
    const animation = useSpring({
        config: {
            duration: 150,
        },
        opacity: showServerModal ? 1 : 0,
        transform: showServerModal ? `scale(1)` : `scale(0.8)`,
    });

    const updateImage = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setImage(file);
    };

    //conditional render with isLoaded
    return showServerModal && isLoaded ? (
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
                    <form
                        className="serverModalForm"
                        onSubmit={(e) => onSubmit(e)}
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
                            <select
                                value={isPublic}
                                onChange={(e) => setIsPublic(e.target.value)}
                            >
                                <option value="true">Public</option>
                                <option value="">Private</option>
                            </select>
                        </div>
                        <div className="serverModalInputContainer">
                            <label htmlFor="serverCategory">Category</label>
                            <select
                                value={serverCategory}
                                onChange={(e) =>
                                    setServerCategory(e.target.value)
                                }
                            >
                                <option value="gaming">Gaming</option>
                                <option value="music">Music</option>
                                <option value="education">Education</option>
                                <option value="science">Science & Tech</option>
                                <option value="entertainment">
                                    Entertainment
                                </option>
                            </select>
                        </div>
                        <div className="serverModalInputContainer">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={updateImage}
                            />
                            {imageLoading && <p>Loading...</p>}
                        </div>
                        <div className="serverModalButtonContainer">
                            <button className="serverModalSubmit" type="submit">
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </animated.div>
        </div>
    ) : null;
}

export default EditServerForm;
