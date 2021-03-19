import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForms.css";



function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const email1 = "demouser@gmail.com";
  const userPw1 = "Demouser123!@#";
  const email2 = "demo@user.io";
  const userPw2 = "password";

  const demoUser = (email, password) => {
    setCredential(email);
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
  };

  return (
    <>
      <div className="login-main__container">
        <div className="login-form__container">
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="btn-modalForm__conatiner">
              <button type="submit" className="submit-login__btn">
                Log In
              </button>
              <button
                type="submit"
                className="demo-login__btn"
                onClick={() => demoUser(email2, userPw2)}
              >
                Demo-User
              </button>
              <button
                type="submit"
                className="demo-login__btn"
                onClick={() => demoUser(email1, userPw1)}
              >
                Demo-Host
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;