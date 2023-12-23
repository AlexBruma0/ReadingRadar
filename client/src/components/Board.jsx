import React, { useEffect, useState } from "react";
import Drag from "./Drag";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import Form from "./Form";
import { v4 as uuid, v4 } from "uuid";
import { createBookAPI, createBook } from "../redux/slices/BooksSlice";
import { useDispatch } from 'react-redux';


export default function Board(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleAdd = async (bid, book) => {
    book = {
      title: book.title,
      id: uuid(),
      author: book.author,
      myRating: book.myRating,
      img_url: book.img_url,
    };
    console.log(bid, book);
    dispatch(createBook(book))
    dispatch(createBookAPI(book))
  };

  const bookFields = {
    title: "",
    author: "",
    img_url: "",
    myRating: "",
    notes: "",
    asin: "",
  };

  return (
    <div className="large-container border-radius">
      <div className="space-between">
        <h2 className="underline">
          {" "}
          {props?.name}{" "}
          <span
            className="border"
            style={{
              backgroundColor: "hotpink",
              fontSize: "large",
              borderRadius: "1000px",
              padding: "0.1rem",
            }}
          >
            {props.books?.length}
          </span>
        </h2>

        <button
          className="small-container margin border-radius secondary-backround-color"
          onClick={toggleOpen}
        >
          <Plus size="20px"></Plus>
        </button>
      </div>
      <Droppable droppableId={props.id}>
        {(provided) => (
          <div
            className="border-radius"
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
          refresh="true"
        />
      </Modal>
    </div>
  );
}