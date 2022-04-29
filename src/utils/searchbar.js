import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const recipeNameRef = useRef();
  const searchBarHandler = () => {
    if (recipeNameRef.current.value) {
      navigate(`/search/${recipeNameRef.current.value}`);
    }
  };
  return (
    <div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" ref={recipeNameRef} />
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
