import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './SignUpForm.css';
import * as sessionActions from '../../../store/session';
import { useDispatch } from 'react-redux';

const SignUpForm = ({
    authenticated,
    setAuthenticated,
    closeModalSignUp,
    openModalLogin,
}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const history = useHistory();

    const onLogin = (e) => {
        e.preventDefault();
        closeModalSignUp();
        openModalLogin();
    };

    const onSignUp = async (e) => {
        e.preventDefault();

        if (password === repeatPassword) {
            const user = await dispatch(
                sessionActions.signup({
                    email,
                    username,
                    password,
                })
            );

            if (!user.payload.errors) {
                setAuthenticated(true);
                return history.push('/discover');
            }
        }
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

    return (
        <div className="SignUpModalWrapper">
            <div className="SignUpModalContainer">
                <div className="SignUpModalFormTitleContainer">
                    <div className="SignUpModalFormTitle">Register</div>
                </div>
                <form onSubmit={onSignUp}>
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
                            value={password}
                        ></input>
                    </div>
                    <div className="SignUpModalInputContainer">
                        <label>Repeat Password</label>
                        <input
                            type="password"
                            name="repeat_password"
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
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
