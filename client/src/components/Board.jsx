import React, { useEffect, useState, useContext } from "react";
import Drag from "./Drag";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import Form from "./Form";
import { v4 as uuid, v4 } from "uuid";
import { createBookAPI, createBook } from "../redux/slices/BooksSlice";
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../components/ThemeContext';
import { themes } from '../themes';

export default function Board(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const handleAdd = async (book) => {
    book = {
      title: book.title,
      id: uuid(),
      author: book.author,
      rating: book.rating,
      img_url: book.img_url,
      category: props.id
    };
    dispatch(createBook(book))
    dispatch(createBookAPI(book))
  };

  const bookFields = {
    title: "",
    author: "",
    img_url: "",
    rating: "",
    notes: "",
  };
  const boardMap = {
    "toBeRead": "To Be Read",
    "read": "Read",
    "reading": "Reading"
  }

  return (
    <div style={{ backgroundColor: currentThemeColors.primary  }} className={`m-4 p-4 rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold`}>
          {boardMap[props.id]}
          <span className="ml-2 text-sm">
            {props.books.length}
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
      <Droppable droppableId={props.id}>
        {(provided) => (
          <div
            className=""
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.books?.map((book, index) => (
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
      <Modal open={open} setOpen={setOpen} formTitle="Add book">
        <Form
          data={bookFields}
          bid={props.key}
          toggleOpen={toggleOpen}
          handleUpdate={handleAdd}
          refresh={false}
          search = {true}

        />
      </Modal>
    </div>
  );
}