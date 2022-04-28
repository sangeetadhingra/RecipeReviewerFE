import React, {useEffect, useState} from "react";
import {useProfile} from "../context/profile-context";

const SecureContent = ({children}) => {
    const {userLoggedIn} = useProfile()
    const [loggedIn, setLoggedIn] = useState(false)
    const checkIfLoggedIn = async () => {
        try {
            await userLoggedIn()
            setLoggedIn(true)
        } catch (e) {
            setLoggedIn(false)
        }
    }
    useEffect(() => { checkIfLoggedIn() }, [])
    if(loggedIn) {
        return children
    }
    return null
};

export default SecureContent;