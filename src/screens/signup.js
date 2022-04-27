import React, {useRef} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";


Axios.defaults.withCredentials = true;
const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const navigate = useNavigate();
    const handleSignUp = async() => {
        try {
            //move to user service
            await Axios.post("http://localhost:4000/api/signup", {
                email:emailRef.current.value,
                password: passwordRef.current.value,
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value
            } )
            navigate('/signin')
        }
        catch (e) {
            console.log(e);
            alert("error signing up");
        }

    }
    return (
        <div>
            <h1>Signup</h1>
            <input ref={emailRef} placeholder="email" type="email" className="form-control"/>
            <input ref={passwordRef} placeholder="password" type="password" className="form-control"/>
            <input ref={firstNameRef} placeholder="First Name" type="String" className="form-control"/>
            <input ref={lastNameRef} placeholder="Last Name" type="String" className="form-control"/>
            <button onClick={handleSignUp} className="btn btn-primary">Signup</button>
        </div>
    )
};
export default SignUp;