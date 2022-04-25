import SearchRecipes from "./screens/search-recipes";
import RecipeDetails from "./screens/recipe-details"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/">
            <Route path="/search" element={<SearchRecipes />} />
            <Route path="/search/:searchString" element={<SearchRecipes />} />
            <Route path="details/:recipeID" element={<RecipeDetails/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
