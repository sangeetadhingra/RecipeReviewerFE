import SearchRecipes from "./screens/search-recipes";
import RecipeDetails from "./screens/recipe-details";
import SignUp from "./screens/signup";
import SignIn from "./screens/signin";
import Profile from "./screens/profile"
import {ProfileProvider} from "./context/profile-context";
import SecureRoutes from "./components/secure-routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
   <ProfileProvider>
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/">
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<SecureRoutes> <Profile /> </SecureRoutes>} />
            <Route path="/search" element={<SearchRecipes />} />
            <Route path="/search/:searchString" element={<SearchRecipes />} />
            <Route path="details/:recipeID" element={<RecipeDetails/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </ProfileProvider>
  );
}

export default App;
