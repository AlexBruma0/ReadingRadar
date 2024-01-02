import React, { useEffect, useState, useContext, useRef } from "react";
import Drag from "./Drag";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { SpinnerCircular } from "spinners-react";
import {
  fetchAmazonBooks,
} from "../redux/slices/BooksSlice";
import BookSelectionForm from "./BookSelectionForm";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
import { createBook, createBookAPI } from "../redux/slices/BooksSlice";
import { v4 as uuid, v4 } from "uuid";


export default function Board({ boardBooks, category }) {
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
  }

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

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const boardMap = {
    toBeRead: "To Be Read",
    read: "Read",
    reading: "Reading",
  };

  return (
    <div
      style={{ backgroundColor: currentThemeColors.primary }}
      className={`m-4 p-4 rounded-lg shadow-lg`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold`}>
          {boardMap[category]}
          <span className="ml-2 text-sm">{boardBooks.length}</span>
        </h2>
        <button
          style={{ backgroundColor: currentThemeColors.accent }}
          className={`p-2 rounded-full bg-`}
          onClick={toggleOpen}
        >
          <Plus />
        </button>
      </div>
      <Droppable droppableId={category}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {boardBooks?.map((book, index) => (
              <Drag key={book._id} id={book._id} book={book} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <dialog
        open={isOpen}
        className="p-5 bg-white rounded-lg shadow-lg fixed inset-0 w-[600px] h-[700px] border-1"
      >
        <div className="flex flex-col h-full justify-between">
          <div onClick={toggleOpen} className="cursor-pointer">
            <X color="#082d0f" size={40} />
          </div>
          <div>
            {fetching ? (
              <div className="center-text">
                <div className="large-text">Searching...</div>
                <SpinnerCircular color="pink" size="30vh" />
              </div>
            ) : (
              <>
                {step === 1 && <SearchForm onSubmit={handleSearchSubmit} />}
                {step === 2 && (
                  <BookSelectionForm
                    books={books}
                    onSelect={handleBookSelect}
                  />
                )}
                {step === 3 && (
                  <AddForm
                    initialValues={selectedBook}
                    category={category}
                    handleSubmitForm={handleAddBook}
                    setOpen={setIsOpen}
                  />
                )}
              </>
            )}
          </div>

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
        </div>
      </dialog>
    </div>
  );
}

