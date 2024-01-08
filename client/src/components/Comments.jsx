import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./Comment";
import {
  fetchCommentsByBook,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "../redux/slices/CommentsSlice"; // Import your Redux actions
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { FaPlus } from "react-icons/fa";

function Comments({ bookId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [loading, setLoading] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCommentsByBook(bookId));
    setLoading(false);
  }, [bookId, dispatch]);

  const handleAddComment = () => {
    const newComment = { content: newCommentContent, bookId };
    dispatch(createCommentAPI(newComment));
    setNewCommentContent("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentAPI(commentId));
  };

  const handleEditComment = (commentId, content) => {
    const updatedComment = { commentId, content };
    dispatch(updateCommentAPI(updatedComment));
  };

  return (
    <div className="mt-10 mx-4">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      <div className="mb-4">
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          className="shadow rounded w-full py-2 px-3 text-gray-700 leading-tight "
          rows="3"
          placeholder="Add a new comment..."
        />
        <button
          onClick={handleAddComment}
          style={{ backgroundColor: currentThemeColors.accent }}
          className="font-bold py-2 px-4 rounded ml-2 transform hover:scale-110 hover:shadow-lg transition duration-200 ease-in-out"
        >
          <FaPlus className="inline-block mr-2" /> Add
        </button>
      </div>
      {!loading && (
        <div>
          {comments.map((comment) => (
            <>
              {comment && comment.content && comment.content.length > 0 && (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onDelete={() => handleDeleteComment(comment._id)}
                  onEdit={handleEditComment}
                />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
