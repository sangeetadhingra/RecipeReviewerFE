import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchRecipeAPIByName } from "../services/recipe-service";
import RecipesViewer from "../utils/recipes-viewer";
import SearchBar from "../utils/searchbar";

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { searchString } = useParams();
  const searchRecipeByName = async () => {
    const recipe = await searchRecipeAPIByName(searchString);
    setRecipes(recipe.hits);
  };
  useEffect(() => {
    if (searchString) {
      searchRecipeByName();
    }
  }, [searchString]);
  return (
    <div>
      <h1 className="text-success">
        {searchString ? "Here's what we found!" : "Looking for something?"}
      </h1>
      <SearchBar />
      <RecipesViewer recipes={recipes} />
    </div>
  );
};

export default SearchRecipes;
