import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteExistingChannel } from '../../store/channel';
import '../ConfirmDelete/ConfirmDelete.css';

function ConfirmDeleteChannel({
    showDeleteChannelModal,
    setShowDeleteChannelModal,
}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteModalRef = useRef();
    // close modal when clicking anywhere else
    const closeDeleteChannelModal = (e) => {
        if (deleteModalRef.current === e.target) {
            setShowDeleteChannelModal(false);
        }
    };

    const channel = useSelector((state) => state.channel);
    const server = useSelector((state) => state.server);

    // close modal when pressing escape key
    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showDeleteChannelModal) {
                setShowDeleteChannelModal(false);
            }
        },
        [showDeleteChannelModal, setShowDeleteChannelModal]
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
        opacity: showDeleteChannelModal ? 1 : 0,
        transform: showDeleteChannelModal ? `scale(1)` : `scale(0.8)`,
    });

    const handleDeleteChannel = (channelId) => {
        dispatch(deleteExistingChannel(channelId));
        setShowDeleteChannelModal(false);
        history.push(`/servers/${server.id}`);
    };

    return showDeleteChannelModal ? (
        <div
            className="serverModalWrapper"
            ref={deleteModalRef}
            onClick={closeDeleteChannelModal}
        >
            <animated.div style={animation}>
                <div className="deleteModalContainer">
                    <div className="deleteModalHeader">
                        {`Are you sure you want to delete ${channel.name}?`}
                    </div>
                    <div className="deleteModalButtons">
                        <button
                            onClick={() => handleDeleteChannel(channel.id)}
                            className="confirmDeleteModalButtonYes"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setShowDeleteChannelModal(false)}
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

export default ConfirmDeleteChannel;
