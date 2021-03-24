import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import { useHistory } from 'react-router-dom';
import { createServer } from '../../store/server';
import './ServerForm.css';

function ServerForm({ showServerModal, setShowServerModal }) {
    const loggedInUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(
        loggedInUser && `${loggedInUser.username}'s server`
    );
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState('true');
    const [image, setImage] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [serverCategory, setServerCategory] = useState('Gaming');
    const [errors, setErrors] = useState('');
    const serverModalRef = useRef();

    // const maxNumber = 1;
    // const onChange = (imageList, addUpdateIndex) => {
    // // data for submit
    // setImage(imageList);
    // console.log((Object.values(imageList[0]))[1])
    // };

    // close modal when clicking anywhere else
    const closeServerModal = (e) => {
        if (serverModalRef.current === e.target) {
            setShowServerModal(false);
        }
    };

    // close modal when pressing escape key
    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showServerModal) {
                setShowServerModal(false);
            }
        },
        [showServerModal, setShowServerModal]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("admin_id", loggedInUser.id);
        formData.append("name", name);
        formData.append("serverCategory", serverCategory);
        formData.append("description", description);
        formData.append("isPublic", isPublic);
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true); 

        if (!name) {
            setErrors('Server name cannot be empty!');
            return;
        }
        const newServer = await dispatch(
            createServer(
                formData
                // admin_id: loggedInUser.id,
                // name,
                // serverCategory,
                // description,
                // isPublic,
                // image,
            )
            
        );
        setImageLoading(false);
        setName(loggedInUser && `${loggedInUser.username}'s server`);
        setDescription('');
        setIsPublic('true');
        setImage('');
        setErrors('');
        setShowServerModal(false);
        history.push(`/servers/${newServer.id}`);
    };
    const updateImage = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        setImage(file);
    }
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
                        <div className="serverModalFormTitle">
                            Create a Server
                        </div>
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
                                onChange={(e) => setIsPublic(e.target.value)}
                            >
                                <option value="true">Public</option>
                                <option value="">Private</option>
                            </select>
                        </div>
                        <div className="serverModalInputContainer">
                            <label htmlFor="serverCategory">Category</label>
                            <select
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


                        {/* <div className="serverModalInputContainer">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                name="image"
                                placeholder="Image Url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div> */}

                        
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

                        {/* <div className="App">
                        <ImageUploading
                            multiple
                            value={image}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop image here
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.data_url} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                        </div> */}

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
