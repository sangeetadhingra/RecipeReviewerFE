
import Axios from "axios";



const API_BASE = process.env.REACT_APP_API_BASE
    ? process.env.REACT_APP_API_BASE
    : "http://localhost:4000/api/api";

export const searchRecipeAPIByName = async (recipeName) => {
    const response = await Axios.get(
        API_BASE + "/" + recipeName
    );
    return response.data;

}

const API_URL =
    "https://api.edamam.com/api/recipes/v2/{$}?type=public&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce";
export const getRecipeAPIByID = async (recipeID) => {
    const RECIPE_URL = API_URL.replace("{$}", recipeID);
    const response = await Axios.get(
        API_BASE + "/" + recipeID
    );
    return response.data;
};

export const getRecipeLikesAPIByID = async (recipeID) => {
    const response = await Axios.get(API_BASE + "/recipeAPI/" + recipeID);
    return response.data;

};