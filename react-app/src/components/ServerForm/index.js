import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createServer } from '../../store/server';

function ServerForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [image, setImage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, description, isPublic, image);
        const newServer = await dispatch(
            createServer({ admin_id: 1, name, description, isPublic, image })
        );
        console.log(newServer);
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    <label htmlFor="public">Public or Private</label>
                    <input
                        type="checkbox"
                        name="public"
                        value={isPublic}
                        onChange={(e) => setIsPublic(e.target.value)}
                    ></input>
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image Url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ServerForm;
