import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { fetchUser } from "../redux/slices/UsersSlice";
import { useDispatch } from "react-redux";

function Comment({ comment, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const userId = localStorage.getItem("userId");
  const commentUserId = comment.user._id;
  const isOwner = userId === commentUserId;
  console.log("comment.user", comment.user);
  const dispatch = useDispatch();

  const [commentUser, setCommentUser] = useState(null);

  useEffect(() => { 
    const fetch = async () => {
      console.log("commentUserId: ", commentUserId);
      const fetchedUser = await dispatch(fetchUser(commentUserId));
      console.log("fetchedUser: ", fetchedUser);
      setCommentUser(fetchedUser.payload);
    };
    fetch();
  }, []);
  

  const handleDelete = () => {
    onDelete(comment._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(comment._id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  return (
    <div style={{ backgroundColor: currentThemeColors.background, color: currentThemeColors.text }} className="p-4 rounded-lg shadow-lg mt-4">
      {commentUser && (
        <div className="flex items-center">
                <img 
                src={commentUser.profilePicture} 
                alt={comment.user.userName} 
                style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
              />
              <p style={{ color: currentThemeColors.text }} className="font-semibold text-lg ml-2">{commentUser.userName}</p>
              </div>
            )
          }

      
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ borderColor: currentThemeColors.border, color: currentThemeColors.text }}
            className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mt-2"
            rows="3"
          />
          <button
            onClick={handleSave}
            style={{ backgroundColor: currentThemeColors.primary }}
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{ backgroundColor: currentThemeColors.secondary }}
            className="ml-2  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      ) : (
        
        <div>
          <p className="mt-2">{comment.content}</p>
          {isOwner && (
            <>
                      <button
            onClick={handleEdit}

            className="font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 text-red-500"
          >
            Delete
          </button>
            </>
            )}
        </div>



      )}
    </div>
  );
};

export default Comment;
