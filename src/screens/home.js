import { React, useEffect, useState } from "react";
import Axios from "axios";
import { useProfile } from "../context/profile-context";
import SecureContent from "../components/secure-content";
import { searchRecipeAPIByName } from "../services/recipe-service";
import RecipesViewer from "../utils/recipes-viewer";

Axios.defaults.withCredentials = true;
const foodIdeas = [
  "chicken",
  "dinner",
  "sandwich",
  "sub",
  "pasta",
  "fruit",
  "beef",
  "pork",
  "tofu",
  "vegetable",
  "lunch",
  "fish",
  "salmon",
  "crab",
  "apple",
  "tacos",
  "sub",
  "soup",
  "stew",
];
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const randomRecipe = foodIdeas[Math.floor(Math.random() * foodIdeas.length)];
  const fetchRandomRecipe = async () => {
    const response = await searchRecipeAPIByName(randomRecipe);
    setRecipes(response.hits);
  };
  const renderFeed = () => {
    return (
      <div className="wd-fade-in">
        <RecipesViewer recipes={recipes} />
      </div>
    );
  };
  useEffect(fetchRandomRecipe, []);
  const { profile } = useProfile();
  return (
    <div className="wd-fade-in">
      <h1 className="text-success">
        What are you feeling today
        <SecureContent>{profile && ` ${profile.firstName}`}</SecureContent>?
      </h1>
      <br />
      <h3 className="text-warning">Need some ideas?</h3>
      {recipes && renderFeed()}
    </div>
  );
};
export default Home;
