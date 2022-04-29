import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchRecipeAPIByName } from "../services/recipe-service";
import RecipesViewer from "../utils/recipes-viewer";
import SearchBar from "../utils/searchbar";

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState();
  const { searchString } = useParams();
  const searchRecipeByName = async () => {
    const recipe = await searchRecipeAPIByName(searchString);
    setRecipes(recipe.hits);
  };
  const renderResults = () => {
    return (
      <div className="wd-fade-in">
        <RecipesViewer recipes={recipes} />
      </div>
    );
  };
  useEffect(() => {
    if (searchString) {
      searchRecipeByName();
    }
  }, [searchString]);
  return (
    <div className="wd-fade-in">
      <h1 className="text-success">
        {searchString ? (
          <span className="wd-fade-in">Here's what we found!</span>
        ) : (
          "Looking for something?"
        )}
      </h1>
      <SearchBar value={searchString} />
      {recipes && renderResults()}
    </div>
  );
};

export default SearchRecipes;
