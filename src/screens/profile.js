import React, {useEffect, useRef, useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";
import {findCommentsByRecipeID, findCommentsByUserID} from "../services/recipe-service";

Axios.defaults.withCredentials = true;
const Profile = () => {
    const navigate = useNavigate();
    const [comments, setComments] = useState([])
    const {profile, signout} = useProfile();
    const findAllPersonsComments = async () => {
        const allComments = await findCommentsByUserID(profile._id);

        console.log(allComments);
        setComments(allComments);
    }
    const logoutBTN = async () => {
        try {
            await signout()
        } catch (e) {
        }
        navigate('/signin')
    }
    useEffect(() => {
        findAllPersonsComments()
    }, [])
    console.log(profile);
    return (
        <div>
            <h1>Profile</h1>
            <h3> Welcome {profile && profile.firstName}!</h3>

            <hr/>
            <div>
                <ul className="list-group">
                    <h5> {profile && profile.firstName}'s comments: </h5>
                    {comments && comments.map((everyComment) => (
                        <li className="list-group-item">
                           RecipeID: {everyComment && everyComment.recipeID}  Comment: {everyComment && everyComment.comment}</li>
                    ))}


                </ul> </div>
            <button
                onClick={logoutBTN}
                className="btn btn-danger">
                Logout
            </button>
        </div>

    )
};
export default Profile;