import React, { useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile-context";

Axios.defaults.withCredentials = true;

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin } = useProfile();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/profile");
    } catch (e) {
      console.log(e);
      alert("Error logging in");
    }
  };
  return (
    <div>
      <h1 className="text-success">Ready to begin reviewing?</h1>
      <input
        ref={emailRef}
        placeholder="email"
        type="email"
        className="form-control"
      />
      <br />
      <input
        ref={passwordRef}
        placeholder="password"
        type="password"
        className="form-control"
      />
      <br />
      <button onClick={handleSignIn} className="btn btn-success me-3">
        Sign in
      </button>
      <a href="/signup">
        <button className="btn btn-warning">Register</button>
      </a>
    </div>
  );
};
export default SignIn;
