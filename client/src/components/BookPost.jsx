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
import { SpinnerCircular } from "spinners-react";

export default function BookPost() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const userId = localStorage.getItem("userId");
  const viewingId = localStorage.getItem("viewingId");
  const isOwner = userId === viewingId;

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      console.log("bookId: ", bookId);
      if (bookId) {
        const fetchedBook = await dispatch(fetchBookById(bookId));
        setBook(fetchedBook.payload); 
      }
    };

    fetchBook();

  }, [bookId, dispatch]);

  const handleUpdate = async (updatedBook) => {
    setIsLoading(true); // Set loading state to true
    updatedBook._id = book._id;
    updatedBook.category = book.category;
    const updatedBookFromServer = await dispatch(updateAPIBook(updatedBook));
    setBook(updatedBookFromServer.payload); 
    setIsLoading(false); 
    setIsEditDialogOpen(false);
  };
  const handleDelete = async () => {
    setIsLoading(true); 
    await dispatch(deleteBookAPI(bookId));
    setIsLoading(false); 
    if (!isLoading) {
      navigate("/home");
    }
  };

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (

    <>
    {book && !isLoading ? (
      <>
            <Book
      book={book}
      handleDelete={handleDelete}
      openDialog={openEditDialog}
      isOwner={isOwner}
    />
    <Comments bookId={bookId} />
    <Modal closeDialog={closeEditDialog} isOpen={isEditDialogOpen} isLoading={isLoading}>
      <AddForm
        category={book.category}
        initialValues={book} 
        handleSubmitForm={handleUpdate}
      />
      {/* for layout purposes */}
      <div className="mt-auto ml-5"></div>
    </Modal> 
      </>
 
    ) : (
      <div className="center-text" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <SpinnerCircular color="black" size="20vh" />
      </div>
    
    )}

    </>
  );
}