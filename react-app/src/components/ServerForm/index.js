import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createServer } from '../../store/server';
import Modal from 'react-modal';
import './ServerForm.css';

function ServerForm({ showServerModal, setShowServerModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState('Public');
    const [image, setImage] = useState('');
    const serverModalRef = useRef();

    // close modal when clicking anywhere else
    // does not seem to work when clicking on navbar yet
    const closeServerModal = (e) => {
        if (serverModalRef.current === e.target) {
            setShowServerModal(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newServer = await dispatch(
            createServer({
                admin_id: 1,
                name,
                description,
                isPublic: isPublic === 'Public',
                image,
            })
        );
        history.push(`/servers/${newServer.id}`);
    };

    return showServerModal ? (
        <div
            className="serverModalWrapper"
            ref={serverModalRef}
            onClick={closeServerModal}
        >
            <div className="serverModalContainer">
                <div className="serverModalFormTitleContainer">
                    <div className="serverModalFormTitle">Create a Server</div>
                </div>
                <form className="serverModalForm" onSubmit={(e) => onSubmit(e)}>
                    <div className="serverModalInputContainer">
                        <label htmlFor="name">Name</label>
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
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div className="serverModalInputContainer">
                        <label htmlFor="image">Image</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Image Url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    ) : null;
}

export default ServerForm;
