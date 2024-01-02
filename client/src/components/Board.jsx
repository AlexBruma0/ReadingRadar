import React, { useEffect, useState, useContext, useRef } from "react";
import Drag from "./Drag";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import { v4 as uuid, v4 } from "uuid";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { Form, Field } from "react-final-form";
import { SpinnerCircular } from "spinners-react";
import {
  fetchAmazonBooks,
  createBook,
  createBookAPI,
} from "../redux/slices/BooksSlice";
import Card from "./Card";

const SearchForm = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleSubmit = (values) => {
    onSubmit(values.searchTerm);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="m-4">
          <div className="mb-4">
            <Field
              name="searchTerm"
              component="input"
              type="text"
              placeholder="Search for book."
              className="w-full p-2 border border-gray-300 rounded focus:bg-slate-100 outline-none"
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: currentThemeColors.primary }}
            className="px-4 py-2 rounded border font-bold"
          >
            Search
          </button>
        </form>
      )}
    />
  );
};

const BookSelectionForm = ({ books, onSelect }) => {
  return (
    <>
      {books && books.length > 0 ? (
        <div>
          {books.map((book) => (
            <div key={book.id} onClick={() => onSelect(book)}>
              <Card book={book} disableOnClick="true" />
            </div>
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </>
  );
};

const AddForm = ({ category, initialValues, setOpen }) => {
  console.log(initialValues)
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const dispatch = useDispatch();
  const bookFields = {
    title: initialValues.title,
    author: initialValues.author,
    img_url: initialValues.img_url,
    rating: "",
    notes: "",
  };

  const onSubmit = async (values) => {
    const book = {
      title: values.title,
      id: uuid(),
      author: values.author,
      rating: values.rating,
      img_url: values.img_url,
      category: category,
    };
    dispatch(createBook(book));
    dispatch(createBookAPI(book));
    setOpen(false);
  };
  const feildMap = {
    title: "Title",
    author: "Author",
    img_url: "Image URL",
    rating: "Rating",
    notes: "Notes"
  };

  return (
    <Form
      initialValues={bookFields}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="m-4">
          {["title", "author", "img_url", "rating", "notes"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 capitalize">
                {feildMap[field] }
              </label>
              <Field
                name={field}
                component={field === "notes" ? "textarea" : "input"}
                type="text"
                placeholder={"Enter " + feildMap[field] }
                className="w-full p-2 border border-gray-300 rounded outline-none focus:bg-slate-100"
              />
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={submitting || pristine}
              style={{ backgroundColor: currentThemeColors.primary }}
              className="px-4 py-2 rounded border font-bold"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
              className="px-4 py-2 bg-gray-200 text-black rounded"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
};

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

  const goToNextStep = () => {
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
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
                <BookSelectionForm books={books} onSelect={handleBookSelect} />
              )}
              {step === 3 && (
                <AddForm
                  initialValues={selectedBook}
                  category={category}
                  setOpen={setIsOpen}
                />
              )}
            </>
          )}
          </div>
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
        </div>
      </dialog>

    </div>
  );
}
