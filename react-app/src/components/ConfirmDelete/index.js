import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteExistingServer } from '../../store/server';
import './ConfirmDelete.css';

function ConfirmDelete({ showDeleteModal, setShowDeleteModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteModalRef = useRef();
    // close modal when clicking anywhere else
    const closeDeleteModal = (e) => {
        if (deleteModalRef.current === e.target) {
            setShowDeleteModal(false);
        }
    };

    const server = useSelector((state) => state.server);

    // close modal when pressing escape key
    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showDeleteModal) {
                setShowDeleteModal(false);
            }
        },
        [showDeleteModal, setShowDeleteModal]
    );

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    // Modal animations from react-spring
    const animation = useSpring({
        config: {
            duration: 150,
        },
        opacity: showDeleteModal ? 1 : 0,
        transform: showDeleteModal ? `scale(1)` : `scale(0.8)`,
    });

    const handleDeleteServer = (serverId) => {
        dispatch(deleteExistingServer(serverId));
        history.push('/');
    };

    return showDeleteModal ? (
        <div
            className="serverModalWrapper"
            ref={deleteModalRef}
            onClick={closeDeleteModal}
        >
            <animated.div style={animation}>
                <div className="deleteModalContainer">
                    <div className="deleteModalHeader">
                        {`Are you sure you want to delete ${server.name}?`}
                    </div>
                    <div className="deleteModalButtons">
                        <button
                            onClick={() => handleDeleteServer(server.id)}
                            className="confirmDeleteModalButtonYes"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(false)}
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

export default ConfirmDelete;