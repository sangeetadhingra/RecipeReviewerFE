import SearchRecipes from "./screens/search-recipes";
import RecipeDetails from "./screens/recipe-details";
import SignUp from "./screens/signup";
import SignIn from "./screens/signin";
import Profile from "./screens/profile";
import Home from "./screens/home";
import { ProfileProvider } from "./context/profile-context";
import SecureRoutes from "./components/secure-routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./utils/navbar";
import VisitProfile from "./screens/visitor-profile";

export const API_BASE = process.env.REACT_APP_API_BASE
  ? process.env.REACT_APP_API_BASE
  : "http://localhost:4000/api";
function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/">
              <Route path="/home" index element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/profile"
                element={
                  <SecureRoutes>
                    <Profile />
                  </SecureRoutes>
                }
              />
              <Route path="/search" element={<SearchRecipes />} />
              <Route path="/search/:searchString" element={<SearchRecipes />} />
              <Route path="/details/:recipeID" element={<RecipeDetails />} />
              <Route path="/profile/:userID" element={<VisitProfile />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
