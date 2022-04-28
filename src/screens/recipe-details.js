import { useState, React, useEffect } from "react";
import Preview from "../utils/preview";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  getRecipeAPIByID,
  getRecipeLikesAPIByID,
} from "../services/recipe-service";
import SecureContent from "../components/secure-content";
import { useProfile } from "../context/profile-context";

Axios.defaults.withCredentials = true;
const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState({});

  const { profile } = useProfile();

  const [ourRecipeDetails, setOurRecipeDetails] = useState({});
  const { recipeID } = useParams();
  const API_BASE = process.env.REACT_APP_API_BASE
    ? process.env.REACT_APP_API_BASE
    : "http://localhost:4000/api";

  const getRecipeByID = async () => {
    const response = await getRecipeAPIByID(recipeID);
    setRecipeDetails(response.recipe);
  };
  const getRecipeLikesByID = async () => {
    const response = await getRecipeLikesAPIByID(recipeID);
    console.log(response);
    if (response) {
      setOurRecipeDetails(response);
    }
  };

  useEffect(() => {
    getRecipeByID();
    getRecipeLikesByID();
  }, []);

  // TODO: Move to services
  const handleLikes = async () => {
    // Construct the recipe
    // TODO: Add more?
    const recipe = {
      title: recipeDetails.label,
      rid: recipeID,
    };
    const response = await Axios.put(
      API_BASE + "/recipes/like/" + recipeID,
      recipe
    );
    setOurRecipeDetails(response.data);
  };
  const handleDislikes = async () => {
    // Construct the recipe
    // TODO: Add more?
    const recipe = {
      title: recipeDetails.label,
      rid: recipeID,
    };
    const response = await Axios.put(
      API_BASE + "/recipes/dislike/" + recipeID,
      recipe
    );
    setOurRecipeDetails(response.data);
  };

  // TODO: Upload recipe to db when liking, add uuid or take hash as RID
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
        <li> Likes: {ourRecipeDetails && ourRecipeDetails.likes}</li>
        <li> Dislikes: {ourRecipeDetails && ourRecipeDetails.dislikes}</li>
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
          </button>{" "}
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
          {" "}
          <div>
            <h3 className="mt-5">Leave a comment:</h3>
            <textarea className="form-control w-50" />
            <button className="btn btn-primary mt-1">Post</button>
            <ul className="list-group">TODO: Grab comments from database</ul>
            <Preview json={recipeDetails} />{" "}
          </div>{" "}
        </SecureContent>
      }
    </div>
  );
};

export default RecipeDetails;
