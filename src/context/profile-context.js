import React, { useContext, useState } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;
const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState();

  const userLoggedIn = async () => {
    try {
      const response = await Axios.get("http://localhost:4000/api/profile");
      setProfile(response.data);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      const response = await Axios.post("http://localhost:4000/api/signup", {
        email,
        password,
        firstName,
        lastName,
      });
      console.log(response.data);
      setProfile(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await Axios.post("http://localhost:4000/api/signin", {
        email,
        password,
      });
      setProfile(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const signout = async () => {
    await Axios.post("http://localhost:4000/api/signout");
    setProfile();
  };

  const value = { profile, signout, signin, signup, userLoggedIn };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
export const useProfile = () => {
  return useContext(ProfileContext);
};
