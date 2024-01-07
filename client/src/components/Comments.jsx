import React, { useState, useEffect, useContext} from "react";
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
import { FaPlus } from 'react-icons/fa';
import { SpinnerCircular } from "spinners-react";


function Comments({ bookId }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const [refreshTriggered, setrefreshTriggered] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Add action loading state

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const fetchedComments = await dispatch(fetchCommentsByBook(bookId));
      setComments(fetchedComments.payload);
      console.log("fetchedComments: ", fetchedComments.payload);
      setrefreshTriggered(false);
      setLoading(false);
    };

    fetchComments();
  }, [refreshTriggered, dispatch]);

  const handleAddComment = async () => {
    setActionLoading(true); // Set action loading state to true
    const newComment = { content: newCommentContent, bookId };
    await dispatch(createCommentAPI(newComment));
    setrefreshTriggered(true);
    setNewCommentContent("");
    setActionLoading(false); // Set action loading state to false
  };

  const handleDeleteComment = async (commentId) => {
    setActionLoading(true); // Set action loading state to true
    await dispatch(deleteCommentAPI(commentId));
    setrefreshTriggered(true);
    setActionLoading(false); // Set action loading state to false
  };

  const handleEditComment = (commentId, content) => {
    const updatedComment = { commentId, content };
    dispatch(updateCommentAPI(updatedComment));
  };

  return (
    <div className="mt-10 mx-4">
      {actionLoading ? (  
        <div className="flex justify-center">
          <SpinnerCircular
            size={200}
            color="black"
          />
        </div>
      ) : (
        <>
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
          style={{ backgroundColor: currentThemeColors.accent }}
          className= "font-bold py-2 px-4 rounded ml-2 transform hover:scale-110 hover:shadow-lg transition duration-200 ease-in-out"
        >
          <FaPlus className="inline-block mr-2" /> Add
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
        </>
      )}

    </div>
  );
}

export default Comments;
