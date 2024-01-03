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

export default function ModalAddForm({ category, closeDialog, isOpen,  }) {
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleSearchSubmit = async (searchTerm) => {
    setFetching(true);
    const response = await dispatch(fetchAmazonBooks(searchTerm));
    setBooks(response.payload);
    setFetching(false);
    setStep(2);
  };

  const handleAddBook = (values) => {
    const book = {
      title: values.title,
      _id: uuid(),
      author: values.author,
      rating: values.rating,
      img_url: values.img_url,
      notes: values.notes,
      category: category,
    };
    dispatch(createBook(book));
    dispatch(createBookAPI(book));
    closeDialog();
  };

  const goToNextStep = () => {
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const goToLastStep = () => {
    setStep(3);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleBookSelect = (book) => {
    setSelectedBook({
      title: book.title,
      author: book.author,
      img_url: book.img_url,
    });
    setStep(3);
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
            <BookSelectionForm books={books} onSelect={handleBookSelect} />
          )}
          {step === 3 && (
            <AddForm
              initialValues={selectedBook}
              category={category}
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
            onClick={goToPreviousStep}
          >
            Back
          </button>
          <button
            style={{ backgroundColor: currentThemeColors.secondary }}
            className="font-bold py-2 px-4 rounded"
            onClick={goToNextStep}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="mt-auto ml-5">
          <button
            style={{ backgroundColor: currentThemeColors.accent }}
            className=" font-bold py-2 px-4 rounded mr-2"
            onClick={goToLastStep}
          >
            Enter Manually
          </button>
        </div>
      )}
    </Modal>
  );
}
