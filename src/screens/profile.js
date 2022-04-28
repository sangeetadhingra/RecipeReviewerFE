import React, {useEffect, useRef, useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";

Axios.defaults.withCredentials = true;
const Profile = () => {
    const navigate = useNavigate();
    const {profile, signout} = useProfile();
    const logoutBTN = async () => {
        try {
            await signout()
        } catch (e) {
        }
        navigate('/signin')
    }
    useEffect(() => {

    }, [])
    console.log(profile);
    return (
        <div>
            <h1>Profile</h1>
            <h3> Welcome {profile && profile.firstName}!</h3>

            <button
                onClick={logoutBTN}
                className="btn btn-danger">
                Logout
            </button>
        </div>

    )
};
export default Profile;