import { React, useEffect, useState } from "react";

const RecipesViewer = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [recipeCards, setRecipeCards] = useState([]);
  const columns = 4;
  const setUpRecipeCards = () => {
    setRecipes(props.recipes);
    console.log(recipes);
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
                  <div className="card m-3 border-none">
                    <img
                      className="card-img-top"
                      src={recipe.recipe.image}
                      alt="Food"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-success">
                        {recipe.recipe.label}
                      </h5>
                      <p className="card-text">
                        {recipe.recipe.cuisineType[0]
                          .split(" ")
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
                          .join(" ") + " "}
                        {recipe.recipe.mealType[0]} {recipe.recipe.dishType[0]}
                      </p>
                      <a
                        href={`/details/${recipe.recipe.uri.substring(44)}`}
                        className="btn btn-warning align-self-end mt-auto w-100"
                        alt=""
                      >
                        Try it yourself!
                      </a>
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
