import React, { useState } from 'react';
import Modal from 'react-modal';
import LogoutButton from '../auth/LogoutButton/index';
import LoginForm from '../auth/LoginForm/index';
import SignUpForm from '../auth/SignUpForm/index';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const NavBar = ({ authenticated, setAuthenticated }) => {
    var subtitle;
    const [modalIsOpenLogin, setIsOpenLogin] = useState(false);
    const [modalIsOpenSignUp, setIsOpenSignUp] = useState(false);
    function openModalLogin() {
        setIsOpenLogin(true);
    }

    function openModalSignUp() {
        setIsOpenSignUp(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModalLogin() {
        setIsOpenLogin(false);
    }

    function closeModalSignUp() {
        setIsOpenSignUp(false);
    }

    return (
        <nav>
            <div>
                <div>
                    {authenticated === true ? (
                        ''
                    ) : (
                        <button onClick={openModalLogin}>Login</button>
                    )}
                    <Modal
                        isOpen={
                            authenticated === true ? false : modalIsOpenLogin
                        }
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalLogin}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <LoginForm
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                        />
                    </Modal>
                </div>
                <div>
                    {authenticated === true ? (
                        ''
                    ) : (
                        <button onClick={openModalSignUp}>Sign Up</button>
                    )}
                    <Modal
                        isOpen={
                            authenticated === true ? false : modalIsOpenSignUp
                        }
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalSignUp}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <SignUpForm
                            authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                        />
                    </Modal>
                </div>
                <button onClick={openServerModal}>Create a Server</button>
                <ServerForm
                    showServerModal={showServerModal}
                    setShowServerModal={setShowServerModal}
                />
                <div>
                    {authenticated === false ? (
                        ''
                    ) : (
                        <LogoutButton setAuthenticated={setAuthenticated} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
