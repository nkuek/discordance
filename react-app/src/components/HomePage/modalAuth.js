import React, { useState } from "react";
import "./Homepage.css";
import Modal from "react-modal";
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";
import { useSelector } from "react-redux";
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#2c2f33",
    borderColor: "#2f3135",
  },
};

Modal.setAppElement("#root");

function modalAuth({ authenticated, setAuthenticated }) {
  //   const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpenLogin, setIsOpenLogin] = false;
  const [modalIsOpenSignUp, setIsOpenSignUp] = false;

  //   const userServers = useSelector((state) => state?.userServers);
  //   const loggedInUser = useSelector((state) => state?.session.user);
  //   const server = useSelector((state) => state.server);

  // debugger;

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
  // onClick={loggedInUser ? openServerModal : openModalLogin}
  return (
    <div className="modal-auth__users">
      {modalIsOpenLogin && (
        <Modal
          isOpen={modalIsOpenLogin}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModalLogin}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <LoginForm
            setIsOpenLogin={setIsOpenLogin}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            closeModalLogin={closeModalLogin}
            openModalSignUp={openModalSignUp}
          />
        </Modal>
      )}
      {modalIsOpenSignUp && (
        <Modal
          isOpen={authenticated === true ? false : modalIsOpenSignUp}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModalSignUp}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            closeModalSignUp={closeModalSignUp}
            openModalLogin={openModalLogin}
          />
        </Modal>
      )}
    </div>
  );
}

export default modalAuth;
