import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/profile-context";
import { findCommentsByUserID } from "../services/user-service";
import CommentsViewer from "../utils/comments-viewer";

Axios.defaults.withCredentials = true;
const Profile = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { profile, signout } = useProfile();
  const findAllPersonsComments = async () => {
    const allComments = await findCommentsByUserID(profile._id);
    setComments(allComments);
  };
  const logoutBTN = async () => {
    try {
      await signout();
    } catch (e) {}
    navigate("/signin");
  };
  useEffect(() => {
    findAllPersonsComments();
  }, [comments]);
  return (
    <div className="wd-fade-in">
      <h1 className="text-success">Profile</h1>
      <h3 className="text-warning"> Welcome {profile && profile.firstName}!</h3>
      <hr />
      <h5>Permissions: {profile && profile.role} </h5>
      <button onClick={logoutBTN} className="btn btn-danger">
        Logout
      </button>
      <hr />
      <div>
        <h5> {profile && profile.firstName}'s Comments: </h5>
        <CommentsViewer comments={comments} showRecipe={true} />
      </div>
    </div>
  );
};
export default Profile;
