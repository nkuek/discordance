import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import LogoutButton from '../auth/LogoutButton/index';
import LoginForm from "../auth/LoginForm/index";
import SignUpForm from "../auth/SignUpForm/index";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



const NavBar = ({ authenticated, setAuthenticated }) => {

var subtitle;
  const [modalIsOpenLogin,setIsOpenLogin] = React.useState(false);
  const [modalIsOpenSignUp,setIsOpenSignUp] = React.useState(false);
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

  function closeModalLogin(){
    setIsOpenLogin(false);
  }
  function closeModalSignUp(){
    setIsOpenSignUp(false);
  }

  return (
    <nav>
      <div>
          <div>
            <button onClick={openModalLogin}>Login</button>
            <Modal
              isOpen={modalIsOpenLogin}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalLogin}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            </Modal>
          </div>
          <div>
            <button onClick={openModalSignUp}>Sign Up</button>
            <Modal
              isOpen={modalIsOpenSignUp}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModalSignUp}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            </Modal>
          </div>
          <div>
            {authenticated === false ? '' : <LogoutButton setAuthenticated={setAuthenticated} />}
          </div>
      </div>
    </nav>


    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to="/" exact={true} activeClassName="active">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/login" exact={true} activeClassName="active">
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/sign-up" exact={true} activeClassName="active">
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/users" exact={true} activeClassName="active">
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton setAuthenticated={setAuthenticated} />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;