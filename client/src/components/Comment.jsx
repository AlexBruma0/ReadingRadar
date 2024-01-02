import React, { useState, useEffect } from "react";

function Comment({ comment, onDelete, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      <p className="text-gray-800 font-semibold">{comment.user.userName}</p>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            rows="3"
          />
          <button onClick={() => { onEdit(comment._id, editedContent); setIsEditing(false); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mt-2">{comment.content}</p>
          <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
