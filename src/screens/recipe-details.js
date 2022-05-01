import { useState, React, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  getRecipeAPIByID,
  getRecipeLikesAPIByID,
  updateRecipeDislikes,
  updateRecipeLikes,
} from "../services/recipe-service";
import { findCommentsByRecipeID, postComment } from "../services/user-service";
import SecureContent from "../components/secure-content";
import { useProfile } from "../context/profile-context";
import CommentsViewer from "../utils/comments-viewer";

Axios.defaults.withCredentials = true;
const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const { profile } = useProfile();

  const [ourRecipeDetails, setOurRecipeDetails] = useState({});
  const { recipeID } = useParams();

  const getRecipeByID = async () => {
    const response = await getRecipeAPIByID(recipeID);
    setRecipeDetails(response.recipe);
  };
  const getRecipeLikesByID = async () => {
    let response;
    if (recipeID) {
      response = await getRecipeLikesAPIByID(recipeID); }
    console.log(response);
    if (response) {
      setOurRecipeDetails(response);
    }
  };

  const findRecipeComments = async () => {
    const allComments = await findCommentsByRecipeID(recipeID);
    setComments(allComments);
  };

  useEffect(() => {
    getRecipeByID();
    getRecipeLikesByID();
    findRecipeComments();
  }, []);
  // Handling ratings
  const handleLikes = async () => {
    const recipe = {
      title: recipeDetails.label,
      rid: recipeID,
    };
    if (!userLiked) {
      const response = await updateRecipeLikes(recipeID, recipe);
      setOurRecipeDetails(response);
      setUserLiked(true);
    }

  };
  const handleDislikes = async () => {
    const recipe = {
      title: recipeDetails.label,
      rid: recipeID,
    };
    if (!userLiked) {
      const response = await updateRecipeDislikes(recipeID, recipe);
      setOurRecipeDetails(response);
      setUserLiked(true);
    }
  };


  const commentRef = useRef();

  const handleComment = async () => {
    const newComment = await postComment(recipeID, profile._id, {
      comment: commentRef.current.value,
      user: profile._id,
      recipeName: recipeDetails.label,
      name: profile.firstName,
    });
    document.getElementById('comments').value = "";
    setComments([newComment,...comments]);
  };

  return (
    <div className="wd-fade-in">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={recipeDetails.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title text-success">{recipeDetails.label}</h1>
              <ul className="list-group mb-2">
                <li className="list-group-item">
                  {" "}
                  Meal Type: {recipeDetails.mealType}
                </li>
                <li className="list-group-item">
                  {" "}
                  Dish Type: {recipeDetails.dishType}
                </li>
                <li className="list-group-item">
                  {" "}
                  Calories: {Math.floor(recipeDetails.calories)}
                </li>
                <li className="list-group-item">
                  {" "}
                  Cuisine Type: {recipeDetails.cuisineType}
                </li>
              </ul>

              <SecureContent>
                <img
                  className="me-2"
                  src="https://img.icons8.com/material-outlined/96/000000/thumb-up.png"
                  width="40"
                  alt=""
                  onClick={handleLikes}
                />
                <span className="text-success">
                  {ourRecipeDetails
                    ? ourRecipeDetails.likes
                      ? ourRecipeDetails.likes
                      : 0
                    : 0}
                </span>
                <img
                  className="me-2 ms-5"
                  src="https://img.icons8.com/material-outlined/96/000000/thumbs-down.png"
                  width="40"
                  alt=""
                  onClick={handleDislikes}
                />
                <span className="text-danger">
                  {ourRecipeDetails
                    ? ourRecipeDetails.dislikes
                      ? ourRecipeDetails.dislikes
                      : 0
                    : 0}
                </span>
              </SecureContent>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-warning">
        Ingredients (for serving size: {recipeDetails.yield} )
      </h3>
      <div className="card " style={{ width: "18rem;" }}>
        <ul className="list-group">
          {recipeDetails.ingredients &&
            recipeDetails.ingredients.map((recipe) => (
              <li className="list-group-item">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  aria-label="..."
                />
                {recipe.text}
              </li>
            ))}
        </ul>
      </div>
      {
        <SecureContent>
          <div>
            <h3 className="mt-5 text-success">Leave a comment:</h3>
            <textarea id="comments" ref={commentRef} className="form-control w-50" />
            <button
              onClick={handleComment}
              className="btn btn-outline-warning mt-1"
            >
              Post
            </button>
          </div>
        </SecureContent>
      }
      <br />
      <CommentsViewer comments={comments} />
    </div>
  );
};

export default RecipeDetails;
