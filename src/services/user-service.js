import Axios from "axios";
import { API_BASE } from "../App";

export const getUserToVisit = async (userId) => {
  const userResponse = await Axios.get(`${API_BASE}/profile/${userId}`);
  if (userResponse !== 503) {
    return userResponse.data;
  } else {
    alert("User not found.");
  }
};

export const postComment = async (recipeID, userID, comments) => {
  const url = `${API_BASE}/recipeDetails/${recipeID}/comments/${userID}`;
  console.log(url);
  const response = await Axios.post(url, comments);
  return response.data;
};

export const findCommentsByRecipeID = async (recipeID) => {
  const response = await Axios.get(`${API_BASE}/comments/${recipeID}`);
  return response.data;
};

export const findCommentsByUserID = async (UserID) => {
  const response = await Axios.get(`${API_BASE}/comments/users/${UserID}`);
  return response.data;
};
