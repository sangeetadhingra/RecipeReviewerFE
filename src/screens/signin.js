import React, {useRef} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";

Axios.defaults.withCredentials = true;

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {signin} = useProfile();
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            await signin(
                emailRef.current.value,
                passwordRef.current.value
            );
            navigate('/profile')
        }
        catch (e) {
            console.log(e);
            alert("Error logging in");
        }
    };
    return (
        <div>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="email" type="email" className="form-control"/>
            <input ref={passwordRef} placeholder="password" type="password" className="form-control"/>
            <button onClick={handleSignIn} className="btn btn-primary">Sign in!</button>
        </div>

    )
};
export default SignIn;