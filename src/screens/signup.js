import React, { useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile-context";

Axios.defaults.withCredentials = true;
const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const keyRef = useRef();
  const { signup } = useProfile();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      //move to user service
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        keyRef.current.value
      );
      navigate("/signin");
    } catch (e) {
      console.log(e);
      alert("error signing up");
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <input
        ref={emailRef}
        placeholder="email"
        type="email"
        className="form-control"
      />
      <input
        ref={passwordRef}
        placeholder="password"
        type="password"
        className="form-control"
      />
      <input
        ref={firstNameRef}
        placeholder="First Name"
        type="String"
        className="form-control"
      />
      <input
        ref={lastNameRef}
        placeholder="Last Name"
        type="String"
        className="form-control"
      />
      <p>Optional security key:</p>
      <input
        ref={keyRef}
        placeholder="Key"
        type="password"
        className="form-control"
      />
      <button onClick={handleSignUp} className="btn btn-primary">
        Signup
      </button>
    </div>
  );
};
export default SignUp;
