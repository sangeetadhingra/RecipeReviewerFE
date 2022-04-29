import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CommentsViewer from "../utils/comments-viewer";
import { getUserToVisit, findCommentsByUserID } from "../services/user-service";

Axios.defaults.withCredentials = true;
const VisitProfile = () => {
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState();
  const userId = useParams();
  const findAllPersonsComments = async () => {
    const user = await getUserToVisit(userId.userID);
    setProfile(user);
    const allComments = await findCommentsByUserID(userId.userID);
    setComments(allComments);
  };
  useEffect(() => {
    findAllPersonsComments();
  }, []);
  return (
    <div className="wd-fade-in">
      <h1 className="text-success">Profile</h1>
      <h3 className="text-warning">
        Say hello to {profile && profile.firstName}!
      </h3>
      <hr />
      <h5>Role: {profile && profile.role} </h5>
      <hr />
      <div>
        <h5> {profile && profile.firstName}'s Comments: </h5>
        <CommentsViewer comments={comments} showRecipe={true} />
      </div>
    </div>
  );
};
export default VisitProfile;
