import Axios from "axios";
import { API_BASE } from "../App";

Axios.defaults.withCredentials = true;

export const searchRecipeAPIByName = async (recipeName) => {
  const response = await Axios.get(`${API_BASE}/api/${recipeName}`);
  return response.data;
};

export const getRecipeAPIByID = async (recipeID) => {
  console.log(recipeID);
  const response = await Axios.get(`${API_BASE}/api/recipeID/${recipeID}`);

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
  console.log(response.data);
  return response.data;
};
