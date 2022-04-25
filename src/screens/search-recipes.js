import { useState, React, useRef, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Axios from "axios";
import Preview from "../utils/preview"

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const recipeNameRef = useRef();
  const {searchString} = useParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const RECIPE_URL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
  const searchRecipeByName = async () => {
    const recipeName = recipeNameRef.current.value
    const response = await Axios.get(RECIPE_URL + recipeName + "&app_id=67754742&app_key=93a49685d010e3cc69c2ee6b73df40ce");
    setRecipes(response.data.hits);
    navigate(`/search/${recipeNameRef.current.value}`)

  }
  console.log(recipes);
  useEffect(() => {
      if (searchString) {
          recipeNameRef.current.value = searchString
          searchRecipeByName()
      }
  }, [])
  return (
    <div>
      <h1>Search Recipes!</h1>
      <button className="btn btn-primary float-end" onClick={searchRecipeByName}>Search</button>
      <input className="form-control w-75" ref={recipeNameRef} />
      <ul className="list-group mt-4">
        {
          recipes.map(recipe => 
            <li className="list-group-item">
              <Link to={`/details/${recipe.recipe.uri.substring(44)}`}>
                <img className="me-4" src={recipe.recipe.image} height={120}/>
                {recipe.recipe.label}
              </Link>
            </li>)
        }
        </ul>
    </div>
  );
};

export default SearchRecipes;
