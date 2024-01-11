import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookById,
  updateAPIBook,
  deleteBookAPI,
} from "../redux/slices/BooksSlice";
import Comments from "./Comments";
import AddForm from "./AddForm";
import Modal from "./Modal";
import Book from "./Book";
import { SpinnerCircular } from "spinners-react";
import { fetchUser } from "../redux/slices/UsersSlice";
import { IoIosArrowBack } from "react-icons/io";

export default function BookPost() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const viewingId = localStorage.getItem("viewingId");
  const isOwner = userId === viewingId;
  const [owner, setOwner] = useState(false);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        const fetchedBook = await dispatch(fetchBookById(bookId));
        setBook(fetchedBook.payload);
      }
    };

    fetchBook();
  }, [bookId, dispatch]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (viewingId) {
        const fetchedOwner = await dispatch(fetchUser(viewingId));
        console.log(fetchedOwner.payload);
        setOwner(fetchedOwner.payload);
      }
    };

    fetchOwner();
  }, [viewingId, dispatch]);

  const handleUpdate = async (updatedBook) => {
    setIsLoading(true); // Set loading state to true
    updatedBook._id = book._id;
    updatedBook.category = book.category;
    const updatedBookFromServer = await dispatch(updateAPIBook(updatedBook));
    console.log("bookpost: ", updatedBookFromServer.payload);
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
          <div className="flex items-center justify-between pe-7 mt-2">
            <div
              className="items-center flex font-bold text-3xl cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack size={30} color="black" />
              <h1>Back</h1>
            </div>

            {owner && (
              <div className="flex font-bold items-center">
                <img
                  src={owner.profilePicture}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "500px",
                    marginRight: "5px",
                  }}
                />
                <div className="text-3xl">{owner.userName}</div>
              </div>
            )}
          </div>

          <Book
            book={book}
            handleDelete={handleDelete}
            openDialog={openEditDialog}
            isOwner={isOwner}
          />
          <Comments bookId={bookId} />
          <Modal
            closeDialog={closeEditDialog}
            isOpen={isEditDialogOpen}
            isLoading={isLoading}
          >
            <AddForm
              categoryProps={book.category}
              initialValues={book}
              handleSubmitForm={handleUpdate}
            />
            {/* for layout purposes */}
            <div className="mt-auto ml-5"></div>
          </Modal>
        </>
      ) : (
        <div
          className="center-text"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <SpinnerCircular color="black" size="20vh" />
        </div>
      )}
    </>
  );
}
