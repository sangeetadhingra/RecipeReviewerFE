import { useState, React, useEffect } from "react";
import Preview from "../utils/preview";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";

const RecipeDetails = () => {
    const API_URL = "https://api.edamam.com/api/recipes/v2/{$}?type=public&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce"
    const [recipeDetails, setRecipeDetails] = useState({});
    const {recipeID} = useParams();
    const RECIPE_URL = API_URL.replace("{$}", recipeID);
    console.log(RECIPE_URL);
    const getRecipeByID = async () => {
        const response = await Axios.get(RECIPE_URL);
        setRecipeDetails(response.data.recipe);

    }




    useEffect(() => { getRecipeByID() }, [])


    return (
            <div>
                <h1>{recipeDetails.label}</h1>
                <p> <img className="img-responsive" src={recipeDetails.image} height={180} className="me-2 float-start"/></p>
                <ul> <li> Meal Type: {recipeDetails.mealType}</li>
                    <li> Dish Type: {recipeDetails.dishType}</li>
                    <li> Calories: {recipeDetails.calories}</li>
                </ul>

                <br/>
                <button className="btn btn-primary btn-success mt-4 positive-relative rounded-pill">Like</button>
                <button className="btn btn-primary btn-danger mt-4 position-relative rounded-pill">Dislike</button> <br/>
            <br/>
                <h3 className="mt-3"> Ingredients (for serving size: {recipeDetails.yield} ) </h3>
                <div className="card " style={{"width": "18rem;"}}>
                    <ul className="list-group list-group-flush">

                    </ul>



                </div>

                <h3 className="mt-5">Leave a comment:</h3>
                <textarea className="form-control w-50"/>
                <button className="btn btn-primary mt-1">Post</button>
                <ul className="list-group">TODO: Grab comments from database</ul>
                <Preview json={recipeDetails}/>
            </div>

    )
};

export default RecipeDetails;