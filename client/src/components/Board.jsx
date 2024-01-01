import React, { useEffect, useState, useContext } from "react";
import Drag from "./Drag";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import { v4 as uuid, v4 } from "uuid";
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../components/ThemeContext';
import { themes } from '../themes';
import { Form, Field } from 'react-final-form';
import { SpinnerCircular } from "spinners-react";
import { fetchAmazonBooks, createBook, createBookAPI } from "../redux/slices/BooksSlice";
import Card from "./Card";


const SearchForm = ({ onSubmit }) => {
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
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
        </form>
      )}
    />
  );
};

const BookSelectionForm = ({ books, onSelect }) => {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id} onClick={() => onSelect(book)}>
          <Card book={book} disableOnClick="true"/>
        </div>
      ))}
    </div>
  );
};

const AddForm = ({category, initialValues, setOpen}) => {
  const dispatch = useDispatch()
  const bookFields = {
    title: initialValues.title,
    author: initialValues.author,
    img_url: initialValues.img_url,
    rating: "",
    notes: "",
  };

  const onSubmit = async values => {
    const book = {
      title: values.title,
      id: uuid(),
      author: values.author,
      rating: values.rating,
      img_url: values.img_url,
      category: category
    };
    dispatch(createBook(book))
    dispatch(createBookAPI(book))
    setOpen(false);
  };

  return (
    <Form
      initialValues={bookFields}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="m-4">
          {["title", "author", "img_url", "rating", "notes"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 capitalize">{field}</label>
              <Field
                name={field}
                component={field === "notes" ? "textarea" : "input"}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={submitting || pristine}
              className="px-4 py-2 bg-blue-500 text-white rounded"
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

export default function Board({boardBooks, category}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

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
      img_url: book.img_url
    });
    setStep(3);
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const boardMap = {
    "toBeRead": "To Be Read",
    "read": "Read",
    "reading": "Reading"
  }

  return (
    <div style={{ backgroundColor: currentThemeColors.primary  }} className={`m-4 p-4 rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold`}>
          {boardMap[category]}
          <span className="ml-2 text-sm">
            {boardBooks.length}
          </span>
        </h2>
        <button
          style={{ backgroundColor: currentThemeColors.accent  }}
          className={`p-2 rounded-full bg-`}
          onClick={toggleOpen}
        >
          <Plus />
        </button>
      </div>
      <Droppable droppableId={category}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardBooks?.map((book, index) => (
              <Drag
                key={book._id}
                id={book._id}
                book={book}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Modal open={open} setOpen={setOpen}>
        {fetching ? (
          <div className="center-text">
            <div className="large-text">Searching...</div>
            <SpinnerCircular color="pink" size="30vh" />
          </div>
        ) : (
          <>
            {step === 1 && <SearchForm onSubmit={handleSearchSubmit} />}
            {step === 2 && (
              <div className="flex justify-between">
                <BookSelectionForm books={books} onSelect={handleBookSelect} />
                <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={goToPreviousStep}>Back</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="">
                <AddForm initialValues={selectedBook} category={category} setOpen={setOpen}/>
                <div className="flex justify-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={goToPreviousStep}>Back</button>
                </div>
              </div>
            )}
            {step < 3 && (
              <div className="flex justify-end mt-auto">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={goToNextStep}>Next</button>
              </div>
            )}
          </>
        )}
      </Modal>

    </div>
  );
}