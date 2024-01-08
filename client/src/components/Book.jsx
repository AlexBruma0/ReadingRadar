import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FaTrashAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// Usage: <FaEdit />

// Book component
const Book = ({ book, handleDelete, openDialog, isOwner }) => (
  <div className="max-w-7xl mx-auto mt-10">
    <div className="bg-white p-5  flex items-start">
      <img
        src={book.img_url}
        alt={book.title}
        className="w-36 h-48 rounded-lg mr-8"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-4xl font-bold">{book.title}</h2>
        <p className="text-gray-700 text-xl">{book.author}</p>
        {book.rating && (
          <div className="flex items-center mt-2">
            <div className="bg-yellow-400 z-0 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800">
              Rating: {book.rating}
            </div>
            <div>
              <ReactStars
                count={5}
                value={book.rating}
                size={20}
                isHalf={true}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
          </div>
        )}
        {isOwner && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={openDialog}
              className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-full transform hover:scale-110 hover:shadow-lg transition duration-200 ease-in-out"
            >
              <FaEdit className="inline-block mr-2" /> Edit
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full ml-2 transform hover:scale-110 hover:shadow-lg transition duration-200 ease-in-out"
            >
              <FaTrashAlt className="inline-block mr-2" /> Delete
            </button>
          </div>
        )}

        <p className="text-gray-600 text-lg my-2">{book.notes}</p>
      </div>
    </div>
  </div>
);

export default Book;
