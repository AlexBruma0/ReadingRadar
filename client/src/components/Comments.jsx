import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Comment from './Comment';
import { 
  fetchCommentsByBook, 
  createCommentAPI, 
  updateCommentAPI, 
  deleteCommentAPI 
} from '../redux/slices/CommentsSlice'; // Import your Redux actions

function Comments({ bookId }) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.comments);
  const [loading, setLoading] = useState(false)
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    setLoading(true)
    dispatch(fetchCommentsByBook(bookId));
    setLoading(false)
  }, [bookId, dispatch]);

  const handleAddComment = () => {
    const newComment = { content: newCommentContent, bookId };
    dispatch(createCommentAPI(newComment));
    setNewCommentContent('');
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentAPI(commentId));
  };

  const handleEditComment = (commentId, content) => {
    const updatedComment = { commentId, content };
    dispatch(updateCommentAPI(updatedComment));
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <textarea 
          value={newCommentContent} 
          onChange={e => setNewCommentContent(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {!loading && 
        <div>
            {comments.map(comment => (
                <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment}
                />
            ))}
        </div>
      }

    </div>
  );
}

export default Comments;
