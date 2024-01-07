import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookById,
  updateBook,
  deleteBook,
  updateAPIBook,
  deleteBookAPI,
} from "../redux/slices/BooksSlice";
import Comments from "./Comments";
import AddForm from "./AddForm";
import Modal from "./Modal";
import Book from "./Book";
import { resetCurrentBook } from "../redux/slices/BooksSlice"; // Import the new action

export default function BookPost() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }

    return () => {
      dispatch(resetCurrentBook());
    };
  }, [bookId, dispatch]);

  const book = useSelector((state) => state.books.currentBook);

  const handleUpdate = async (updatedBook) => {
    updatedBook._id = book._id;
    updatedBook.category = book.category;

    dispatch(updateBook(updatedBook));
    dispatch(updateAPIBook(updatedBook));
    setIsEditDialogOpen(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    dispatch(deleteBookAPI(bookId));
    dispatch(deleteBook(bookId));
    navigate("/home");
    window.location.reload();
    
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
      <Book
        book={book}
        handleDelete={handleDelete}
        openDialog={openEditDialog}
      />
      <Comments bookId={bookId} />
      <Modal closeDialog={closeEditDialog} isOpen={isEditDialogOpen}>
        <AddForm
          category={book.category}
          initialValues={book} 
          handleSubmitForm={handleUpdate}
        />
        {/* for layout purposes */}
        <div className="mt-auto ml-5"></div>
      </Modal>
    </>
  );
}
