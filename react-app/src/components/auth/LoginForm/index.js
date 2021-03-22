import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/auth";
import "./LoginForm.css";

const LoginForm = ({
  authenticated,
  setAuthenticated,
  setIsOpenLogin,
  openModalSignUp,
  closeModalLogin,
}) => {
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
    const user = await login(email, password);
    if (!user.errors) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsOpenLogin(false);
      setAuthenticated(true);
      return <Redirect to="/" />;
    } else {
      setErrors(user.errors);
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const user = await login("demo@aa.io", "password");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsOpenLogin(false);
    setAuthenticated(true);
    return <Redirect to="/" />;
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

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
            />
          </div>
          <div className="LoginModalButtonContainer">
            <button className="LoginModalSubmit" type="submit">
              Login
            </button>
          </div>
          <div className="LoginModalButtonContainer">
            <button
              onClick={handleDemoUser}
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
