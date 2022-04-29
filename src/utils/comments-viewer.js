import { React, useEffect, useState } from "react";
import { useProfile } from "../context/profile-context";
import { deleteCommentByID } from "../services/user-service";
import SecureContent from "../components/secure-content";

const CommentsViewer = (props) => {
  const [comments, setComments] = useState([]);
  const { profile } = useProfile();
  const deleteComment = async (comment) => {
    await deleteCommentByID(profile ? profile._id : "", comment._id);
  };
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
            <SecureContent>
              <button
                className="btn btn-danger float-end"
                onClick={async () => deleteComment(comment)}
              >
                X
              </button>
            </SecureContent>
            <div className="d-flex w-75 justify-content-between">
              <a
                href={`/profile/${comment.commenter}`}
                className="text-decoration-none"
              >
                <h5 className="mb-1 text-success">{comment.name}</h5>
              </a>
              <p className="mb-1 fs-5">
                {props.showRecipe && (
                  <a
                    className="text-warning text-decoration-none"
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
