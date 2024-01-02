import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./Comment";
import {
  fetchCommentsByBook,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI,
} from "../redux/slices/CommentsSlice"; // Import your Redux actions

function Comments({ bookId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [loading, setLoading] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");

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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
          placeholder="Add a new comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Add Comment
        </button>
      </div>
      {!loading && (
        <div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={() => handleDeleteComment(comment._id)}
              onEdit={handleEditComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
