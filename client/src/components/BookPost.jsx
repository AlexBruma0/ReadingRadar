import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookById,
  updateBook,
  deleteBook,
  updateAPIBook,
  deleteBookAPI
} from "../redux/slices/BooksSlice";
import ReactStars from "react-rating-stars-component";
import Comments from "./Comments";
import AddForm from "./AddForm";
import Modal from "./Modal";


// Book component
const Book = ({ book, handleDelete, handleUpdate }) => (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="bg-white p-5  flex items-start">
        <img
          src={book.img_url}
          alt={book.title}
          className="w-48 h-64 rounded-lg mr-8"
        />
        <div className="flex flex-col flex-1">
          <h2 className="text-4xl font-bold">{book.title}</h2>
          <p className="text-gray-700 text-xl">{book.author}</p>
          <div className="flex items-center my-2">
          <div className="bg-yellow-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800">
            My Rating: {book.rating}
          </div>
          <div >
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

          <p className="text-gray-600 text-lg my-2">{book.notes}</p>
          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 my-2">
            {book.category}
          </span>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleUpdate(book)}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-2.5"
            >
              Edit Post
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-6 py-2.5"
            >
              Delete Post
            </button>
            <button
              // Handle comment logic here
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-2.5"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  

export default function BookPost() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [bookId, dispatch]);

  const book = useSelector((state) => state.books.currentBook);

  const handleUpdate = async (updatedBook) => {
    dispatch(updateBook(updatedBook));
    dispatch(updateAPIBook(updatedBook));
    setIsEditDialogOpen(false); // Close the dialog after update
  };

  const handleDelete = async () => {
    dispatch(deleteBookAPI(bookId));
    dispatch(deleteBook(bookId));
    navigate("/home");
  };

  const handleComment = () => {
    // Logic to handle adding a comment
  };

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <Book book={book} handleDelete={handleDelete} handleUpdate={() => openEditDialog()} />
        <Comments bookId={bookId} />
        {isEditDialogOpen && (
        <Modal closeDialog={closeEditDialog}>
          <AddForm
            category={book.category} // Pass the book's category
            initialValues={{
              title: book.title,
              author: book.author,
              img_url: book.img_url,
              rating: book.rating,
              notes: book.notes
            }}
            onSubmit={handleUpdate}
            setOpen={setIsEditDialogOpen}
          />
        </Modal>
      )}
    </>

  );
}
