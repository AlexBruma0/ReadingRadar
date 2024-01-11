import React, { useState, useContext } from "react";
import { SpinnerCircular } from "spinners-react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  createBook,
  createBookAPI,
  fetchAmazonBooks,
} from "../redux/slices/BooksSlice";
import BookSelectionForm from "./BookSelectionForm";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import Modal from "./Modal";

export default function ModalAddForm({ category, closeDialog, isOpen }) {
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState({});
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleSearchSubmit = async (searchTerm) => {
    setFetching(true);
    const response = await dispatch(fetchAmazonBooks(searchTerm));
    const book = response.payload;
    setSelectedBook({
      title: book.title,
      author: book.author,
      img_url: book.img_url,
    });
    setStep(2);
    setFetching(false);
  };

  const handleAddBook = (values) => {
    const book = {
      title: values.title,
      _id: uuid(),
      author: values.author,
      rating: values.rating,
      img_url: values.img_url,
      notes: values.notes,
      category: values.category ? values.category : category,
    };
    dispatch(createBookAPI(book));
    setSelectedBook({});
    setStep(1);
    closeDialog();
  };

  return (
    <Modal isOpen={isOpen} closeDialog={closeDialog}>
      {/* Modal Content */}
      {fetching ? (
        <div className="center-text">
          <div className="large-text">Searching...</div>
          <SpinnerCircular color="pink" size="30vh" />
        </div>
      ) : (
        <>
          {step === 1 && <SearchForm onSubmit={handleSearchSubmit} />}
          {step === 2 && (
            <AddForm
              initialValues={selectedBook}
              categoryProps={category}
              handleSubmitForm={handleAddBook}
            />
          )}
        </>
      )}

      {/* Step Navigation */}
      {step > 1 ? (
        <div className="mt-auto ml-5">
          <button
            style={{ backgroundColor: currentThemeColors.accent }}
            className=" font-bold py-2 px-4 rounded mr-2"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="mt-auto ml-5">
          <button
            style={{ backgroundColor: currentThemeColors.accent }}
            className=" font-bold py-2 px-4 rounded mr-2"
            onClick={() => setStep(2)}
          >
            Enter Manually
          </button>
        </div>
      )}
    </Modal>
  );
}
