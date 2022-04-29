import Axios from "axios";
import { API_BASE } from "../App";

export const getUserToVisit = async (userId) => {
  try {
    const response = await Axios.get(`${API_BASE}/profile/${userId}`);
    return response.data;
  } catch (e) {
    alert("User not found.");
  }
};

export const postComment = async (recipeID, userID, comments) => {
  const url = `${API_BASE}/recipeDetails/${recipeID}/comments/${userID}`;
  const response = await Axios.post(url, comments);
  return response.data;
};

export const findCommentsByRecipeID = async (recipeID) => {
  const response = await Axios.get(`${API_BASE}/comments/${recipeID}`);
  return response.data;
};

export const findCommentsByUserID = async (userID) => {
  const response = await Axios.get(`${API_BASE}/comments/users/${userID}`);
  return response.data;
};

export const deleteCommentByID = async (userID, commentID) => {
  try {
    await Axios.delete(`${API_BASE}/comments/${commentID}/${userID}`);
  } catch (e) {
    alert("Must be an administrator or original poster to delete.");
  }
};
