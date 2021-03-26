import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignUpForm.css";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { fetchUserServers } from "../../../store/userInfo";

import { usePasswordValidation } from "./usePasswordValitation";

const SignUpForm = ({
  authenticated,
  setAuthenticated,
  closeModalSignUp,
  openModalLogin,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  const history = useHistory();

  // const [password, setPassword] = useState({
  //   firstPassword: "",
  //   secondPassword: "",
  // });

  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    match,
    specialChar,
  ] = usePasswordValidation({
    firstPassword: password.firstPassword,
    secondPassword: password.secondPassword,
  });

  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };
  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const formData1 = new FormData();
    formData1.append("username", username);
    formData1.append("email", email);

    formData1.append("password", password);

    formData1.append("image", image);
    console.log(formData1);

    // validLength &&
    // hasNumber &&
    // upperCase &&
    // lowerCase &&
    // match &&
    // specialChar

    const user = await dispatch(sessionActions.signup(formData1));
    if (!user.payload.errors) {
      setImageLoading(false);
      setAuthenticated(true);
      dispatch(fetchUserServers(user.payload.id));

      return history.push("/discover");
    } else {
      setErrors(user.payload.errors);
    }
  };

  // let passwordValidation = "";

  // if (password !== repeatPassword) {
  //   passwordValidation = "password most match";
  // }

  const onLogin = (e) => {
    e.preventDefault();
    closeModalSignUp();
    openModalLogin();
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  const updateImage = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="SignUpModalWrapper">
      <div className="SignUpModalContainer">
        <div className="SignUpModalFormTitleContainer">
          <div className="SignUpModalFormTitle">Register</div>
        </div>
        <form onSubmit={onSignUp}>
          <div className="LoginErrorModalContainer">
            {/* {validLength ? <span>True</span> : <span>False</span>} */}

            {errors.map((error) => (
              <div className="login-errors__container">{error}</div>
            ))}
          </div>
          <div className="SignUpModalInputContainer">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              // onChange={setFirst}
              value={password}
              required={true}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              // onChange={setSecond}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="SignUpModalInputContainer">
            <label htmlFor="image">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={updateImage}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div className="SignUpModalButtonContainer">
            <button className="SignUpModalSubmit" type="submit">
              Sign Up
            </button>
          </div>
          <div>
            <button className="already-a-member" onClick={onLogin}>
              Already a Member? Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
