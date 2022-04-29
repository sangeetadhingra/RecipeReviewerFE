import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../context/profile-context";

const SecureRoutes = ({ children }) => {
  const { userLoggedIn } = useProfile();
  const [loggedInUser, setLoggedInUser] = useState();
  const [waitingForUser, setWaitingForUser] = useState(true);
  const check = async () => {
    try {
      const user = await userLoggedIn();
      setLoggedInUser(user);
      setWaitingForUser(false);
    } catch (e) {
      setWaitingForUser(false);
    }
  };
  useEffect(() => {
    check();
  }, []);
  if (loggedInUser) {
    return children;
  } else if (waitingForUser) {
    return null;
  } else {
    return <Navigate to="/signin" />;
  }
};
export default SecureRoutes;
