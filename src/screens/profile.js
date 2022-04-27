import React, {useEffect, useRef, useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

Axios.defaults.withCredentials = true;
const Profile = () => {

    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    //move to services
    const getCurrentUser = async() => {
        try {
            const userResponse = await Axios.post("http://localhost:4000/api/profile");
            setCurrentUser(userResponse.data)
        }
        catch (e) {
            navigate('/signin')
        }
    }
    console.log(currentUser);
    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        <div>
            <h1>Profile</h1>
            <h2>Welcome User: {currentUser && currentUser.firstName}</h2>
        </div>

    )
};
export default Profile;