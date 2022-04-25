import { useState, React, useEffect } from "react";
import Preview from "../utils/preview";
import { useParams } from "react-router-dom";
import Axios from "axios";


const RecipeDetails = () => {
    const API_URL = "https://api.edamam.com/api/recipes/v2/{$}?type=public&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce"
    const [recipeDetails, setRecipeDetails] = useState({});
    const {recipeID} = useParams();
    const RECIPE_URL = API_URL.replace("{$}", recipeID);
    const getRecipeByID = async () => {
        const response = await Axios(RECIPE_URL);
        setRecipeDetails(response.data);
    }
    useEffect(() => { getRecipeByID() }, [])
    return (
        <div>
            <h1>{recipeDetails.recipe.label}</h1>
            <button className="btn btn-primary">Like</button>
            <button className="btn btn-primary">Dislike</button>
            <h3>Leave a comment:</h3>
            <textarea className="form-control"/>
            <ul className="list-group">TODO: Grab comments from database</ul>
            <Preview json={recipeDetails}/>
        </div>
    )
};

export default RecipeDetails;