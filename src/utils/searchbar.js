import {React, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const recipeNameRef = useRef();
  const [searchString, updateSearchString] = useState();
  const searchBarHandler = () => {
    if (recipeNameRef.current.value) {
      updateSearchString(recipeNameRef.current.value)
      navigate(`/search/${recipeNameRef.current.value}`);
    }
  };
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          ref={recipeNameRef}
          value={searchString}
          onChange={(e) => updateSearchString(e.target.value)}
        />
        <button
          className="btn btn-primary btn-success"
          type="button"
          onClick={searchBarHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
