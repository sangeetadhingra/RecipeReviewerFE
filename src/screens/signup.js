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
      alert("Error signing up");
    }
  };
  return (
    <div className="wd-fade-in">
      <h1 className="text-warning mb-5">Tell us a little about yourself!</h1>
      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Email*
        </label>
        <div className="col-sm-10">
          <input ref={emailRef} type="email" className="form-control" />
        </div>
      </div>

      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Password*
        </label>
        <div className="col-sm-10">
          <input ref={passwordRef} type="password" className="form-control" />
        </div>
      </div>

      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          First Name*
        </label>
        <div className="col-sm-10">
          <input ref={firstNameRef} type="String" className="form-control" />
        </div>
      </div>

      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Last Name*
        </label>
        <div className="col-sm-10">
          <input ref={lastNameRef} type="String" className="form-control" />
        </div>
      </div>

      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Security Key
        </label>
        <div className="col-sm-10">
          <input ref={keyRef} type="password" className="form-control" />
        </div>
      </div>
      <div className="text-center">
        <button onClick={handleSignUp} className="btn btn-success fs-5">
          Sign up
        </button>
      </div>
      <p className="mt-2 text-center">* required</p>
    </div>
  );
};
export default SignUp;
