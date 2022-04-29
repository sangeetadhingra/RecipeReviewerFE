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

  const { profile } = useProfile();

  const [ourRecipeDetails, setOurRecipeDetails] = useState({});
  const { recipeID } = useParams();

  const getRecipeByID = async () => {
    const response = await getRecipeAPIByID(recipeID);
    setRecipeDetails(response.recipe);
  };
  const getRecipeLikesByID = async () => {
    const response = await getRecipeLikesAPIByID(recipeID);
    if (response) {
      setOurRecipeDetails(response);
    }
  };

  const findRecipeComments = async () => {
    const allComments = await findCommentsByRecipeID(recipeID);
    console.log(allComments);
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
    const response = await updateRecipeLikes(recipeID, recipe);
    setOurRecipeDetails(response);
  };
  const handleDislikes = async () => {
    const recipe = {
      title: recipeDetails.label,
      rid: recipeID,
    };
    const response = await updateRecipeDislikes(recipeID, recipe);
    setOurRecipeDetails(response);
  };

  const commentRef = useRef();

  const handleComment = async () => {
    const newComment = await postComment(recipeID, profile._id, {
      comment: commentRef.current.value,
      user: profile._id,
      recipeName: recipeDetails.label,
      name: profile.firstName,
    });

    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h1>{recipeDetails.label}</h1>
      <p>
        <img
          className="img-responsive me-2 float-start"
          src={recipeDetails.image}
          height={180}
          alt="Recipe"
        />
      </p>
      <ul>
        <li> Meal Type: {recipeDetails.mealType}</li>
        <li> Dish Type: {recipeDetails.dishType}</li>
        <li> Calories: {recipeDetails.calories}</li>
        <li>
          Likes:
          {ourRecipeDetails
            ? ourRecipeDetails.likes
              ? ourRecipeDetails.likes
              : 0
            : 0}
        </li>
        <li>
          Dislikes:
          {ourRecipeDetails
            ? ourRecipeDetails.dislikes
              ? ourRecipeDetails.dislikes
              : 0
            : 0}
        </li>
      </ul>
      <br />
      <SecureContent>
        <div>
          <button
            className="btn btn-primary btn-success mt-4 positive-relative rounded-pill"
            onClick={handleLikes}
          >
            Like
          </button>
          <button
            className="btn btn-primary btn-danger mt-4 position-relative rounded-pill"
            onClick={handleDislikes}
          >
            Dislike
          </button>
        </div>
      </SecureContent>
      <br />
      <br />
      <h3 className="mt-3">
        Ingredients (for serving size: {recipeDetails.yield} )
      </h3>
      <div className="card " style={{ width: "18rem;" }}>
        <ul className="list-group">
          {recipeDetails.ingredients &&
            recipeDetails.ingredients.map((recipe) => (
              <li className="list-group-item">{recipe.text}</li>
            ))}
        </ul>
      </div>
      {
        <SecureContent>
          <div>
            <h3 className="mt-5">Leave a comment:</h3>
            <textarea ref={commentRef} className="form-control w-50" />
            <button onClick={handleComment} className="btn btn-primary mt-1">
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
