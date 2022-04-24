import SearchRecipes from "./screens/search-recipes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/">
            <Route index element={<SearchRecipes />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
