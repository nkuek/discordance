import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/auth";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setIsOpenLogin,
  openModalSignUp,
  closeModalLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = (e) => {
    e.preventDefault();
    closeModalLogin();
    openModalSignUp();
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(sessionActions.login({ email, password }));
    if (!user.payload.errors) {
      setIsOpenLogin(false);
      setAuthenticated(true);
      return <Redirect to="/" />;
    } else {
      setErrors(user.payload.errors);
    }
  };

  const email1 = "demo@aa.io";
  const password1 = "password";

  const demoUser = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  console.log(authenticated);
  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="LoginModalWrapper">
      <div className="LoginModalContainer">
        <div className="LoginModalFormTitleContainer">
          <div className="LoginModalFormTitle">Welcome Back</div>
        </div>
        <form onSubmit={onLogin}>
          <div className="LoginErrorModalContainer">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="LoginModalInputContainer">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
              require
            />
          </div>
          <div className="LoginModalInputContainer">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              require
            />
          </div>
          <div className="LoginModalButtonContainer">
            <button className="LoginModalSubmit" type="submit">
              Login
            </button>
          </div>
          <div className="LoginModalButtonContainer">
            <button
              onClick={() => demoUser(email1, password1)}
              className="LoginModalSubmit"
              type="submit"
            >
              Demo User
            </button>
          </div>
          <div>
            <button className="not-a-member" onClick={onSignUp}>
              Not a Member? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
