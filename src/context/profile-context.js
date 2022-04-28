import React, {useContext, useState} from "react";
import axios from "axios";
import Axios from "axios";

Axios.defaults.withCredentials = true;
const ProfileContext = React.createContext()

export const ProfileProvider = ({children}) => {
    const [profile, setProfile]
        = useState()


    const userLoggedIn = async () => {
        try {
            const response = await Axios
                .post("http://localhost:4000/api/profile")
            setProfile(response.data)
            return response.data
        } catch (e) {
            throw e
        }
    }

    const signup = async (email, password, firstName, lastName) => {
        try {
            const response = await Axios
                .post("http://localhost:4000/api/signup",
                    { email, password, firstName, lastName })
            console.log(response.data);
            setProfile(response.data)
        } catch (e) { throw e }
    }


    const signin = async (email, password) => {
        try {
            const response = await Axios
                .post("http://localhost:4000/api/signin",
                    {email, password})
            setProfile(response.data)
        } catch (e) {
            throw e
        }
    }

    const signout = async () => {
        const response = await Axios
            .post("http://localhost:4000/api/signout")
        setProfile(null)
    }

    const value = {profile, signout, signin, signup, userLoggedIn}

    return(
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
export const useProfile = () => {
    return useContext(ProfileContext);
}
