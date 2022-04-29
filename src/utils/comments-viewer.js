import { React, useEffect, useState } from "react";

const CommentsViewer = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(props.comments);
  }, [props, comments, setComments]);
  return (
    <div className="list-group">
      {comments &&
        comments.map((comment) => (
          <div
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-50 justify-content-between">
              <a href={`/profile/${comment.commenter}`}>
                <h5 className="mb-1 text-success">{comment.name}</h5>
              </a>
              <p className="mb-1 fs-5">
                {props.showRecipe && (
                  <a
                    className="text-warning"
                    href={`/details/${comment.recipeID}`}
                  >
                    {comment.recipeName}
                  </a>
                )}
              </p>
            </div>
            <p className="mb-1">{comment.comment}</p>
          </div>
        ))}
    </div>
  );
};
export default CommentsViewer;
