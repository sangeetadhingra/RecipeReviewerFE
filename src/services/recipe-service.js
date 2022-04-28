import Axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
  ? process.env.REACT_APP_API_BASE
  : "http://localhost:4000/api/api";

Axios.defaults.withCredentials = true;

export const searchRecipeAPIByName = async (recipeName) => {
  const response = await Axios.get(`${API_BASE}/${recipeName}`);
  return response.data;
};

export const getRecipeAPIByID = async (recipeID) => {
  console.log(recipeID);
  const response = await Axios.get(`${API_BASE}/recipeID/${recipeID}`);

  return response.data;
};

export const getRecipeLikesAPIByID = async (recipeID) => {
  const response = await Axios.get(`${API_BASE}/recipeAPI/${recipeID}`);
  console.log(response.data);
  return response.data;
};

export const updateRecipeLikes = async (recipeID, recipe) => {
  return updateRecipeRating(recipeID, recipe, "like");
};

export const updateRecipeDislikes = async (recipeID, recipe) => {
  return updateRecipeRating(recipeID, recipe, "dislike");
};
const updateRecipeRating = async (recipeID, recipe, rating) => {
  const response = await Axios.put(
    `${API_BASE}/recipes/${rating}/${recipeID}`,
    recipe
  );
  return response.data;
};

export const postComment = async (recipeID, userID, comments) => {
  const url = API_BASE + `/recipeDetails/${recipeID}/comments/${userID}`;
  const response = await Axios.post(url, comments);
  return response.data;
};

export const findCommentsByRecipeID = async (recipeID) => {
  const response = await Axios.get(API_BASE + `/comments/${recipeID}`);
  return response.data;
};

export const findCommentsByUserID = async (UserID) => {
  const response = await Axios.get(API_BASE + `/comments/users/${UserID}`);
  return response.data;
};
