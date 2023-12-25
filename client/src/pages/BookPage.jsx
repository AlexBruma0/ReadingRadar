import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rating } from "react-simple-star-rating";
import { MessageCircle, Edit, Trash } from "react-feather";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';
import { fetchBookById } from "../redux/slices/BooksSlice";
import Sidebar from "../components/SideBar";

import { updateBook, updateAPIBook, deleteBook, deleteBookAPI } from "../redux/slices/BooksSlice";

export default function BookPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const bookId = params.id;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookById(bookId));
    }
  }, [bookId, dispatch]); 

  const book = useSelector(state => state.books.currentBook)

  const handleUpdate = async (book) => {
    dispatch(updateBook(book))
    dispatch(updateAPIBook(book))
  };

  const handleDelete = async (bookId) => {
    dispatch(deleteBook(bookId))
    dispatch(deleteBookAPI(bookId))
    navigate("/home")
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  if(book){
    return (
      <>
        <Navbar />
        <div className="flexbox">
          <Sidebar/>
          <div className="large-container flex-3" style={{ maxHeight: 100000 }}>
            <h1 className="underline center-text">
              {book.title} -- <i>{book.author}</i>
            </h1>
            <div className="grid-container--large ">
              <div className=" border-radius">
                <div>
                  <h1>
                    <span style={{ fontSize: 100 }}>{book.myRating}</span> / 5
                  </h1>
                </div>
                <Rating
                  readonly="true"
                  allowFraction="true"
                  initialValue={book.myRating}
                  size="50px"
                  fillColor="var(--secondary-color)"
                  emptyColor="#f2f2f3"
                />
                <p>{book.notes}</p>
              </div>
              <div className=" padding center-text">
                <img src={book.img_url} className="large-img" alt="" />
              </div>
            </div>
          </div>
          <div className="flexbox margin-top">
            <button className="full-width" onClick={toggleOpen}>
              <Edit></Edit> <i></i>
            </button>
            <button
              className="full-width"
              onClick={() => {
                handleDelete(book);
              }}
            >
              <Trash></Trash> <i></i>
            </button>
          </div>
        </div>



        <Modal open={open} setOpen={setOpen} formTitle="Edit book">
          <Form
            data={book}
            bid={book.category}
            handleUpdate={handleUpdate}
            toggleOpen={toggleOpen}
          />
        </Modal>
      </>
    );
  }

}
