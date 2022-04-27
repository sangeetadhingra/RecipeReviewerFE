import React, {useRef} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

Axios.defaults.withCredentials = true;

const SignIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            await Axios.post("http://localhost:4000/api/signin", {
                email:emailRef.current.value,
                password: passwordRef.current.value
            });
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
            <button onClick={handleSignIn} className="btn btn-primary">Signup</button>
        </div>

    )
};
export default SignIn;