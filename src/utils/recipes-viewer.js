import { React, useEffect, useState } from "react";

const RecipesViewer = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [recipeCards, setRecipeCards] = useState([]);
  const columns = 4;
  const setUpRecipeCards = () => {
    setRecipes(props.recipes);
    let cards = [];
    for (let i = columns; i > 0; i--) {
      cards.push(recipes.splice(0, Math.ceil(recipes.length / i)));
    }
    setRecipeCards(cards);
  };
  useEffect(setUpRecipeCards, [props, recipes]);
  return (
    <div>
      {recipeCards &&
        recipeCards.map((row) => {
          return (
            <div className="card-group">

          {row &&
                row.map((recipe) => (
                  <div className="card m-3  border-none">
                    <a href={`/details/${recipe.recipe.uri.substring(44)}`}><img
                      className="card-img-top"
                      src={recipe.recipe.image}
                      alt="Food"
                    /></a>
                    <div className="card-body d-flex flex-column">
                     <div className="d-none d-md-block"> <a href={`/details/${recipe.recipe.uri.substring(44)}`}><h5 className="card-title text-success">
                        {recipe.recipe.label}
                      </h5> </a></div>
                      <p className="card-text">
                        <div className="d-none d-md-block">{recipe.recipe.cuisineType[0]
                          .split(" ")
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
                          .join(" ") + " "} </div>
                        <div className="d-none d-lg-block">
                        {recipe.recipe.mealType[0]} {recipe.recipe.dishType[0]} </div>
                      </p>
                      <div className="d-none d-lg-block"><a
                        href={`/details/${recipe.recipe.uri.substring(44)}`}
                        className="btn btn-warning align-self-end mt-auto w-100"
                        alt=""
                      >
                        Try it yourself!
                      </a> </div>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
    </div>
  );
};
export default RecipesViewer;
