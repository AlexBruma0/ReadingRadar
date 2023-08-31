import React, { useEffect, useState } from "react";
import Card from "./Card";
import { SpinnerCircular } from "spinners-react";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import Form from "./Form";
import { v4 as uuid, v4 } from "uuid";

export default function Board(props) {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState(props.card);
  const uri = props.uri;

  const toggleOpen = () => {
    setOpen(!open);
  };
  const fetchFromAmazon = async (asin) => {
    const response = await fetch(`${uri}asin/${asin}`);
    const json = await response.json();
    return json;
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

    try {
      await fetch(`${uri}book/${props.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          card: book,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setBooks([...books, book]);
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
            {props.card?.length}
          </span>
        </h2>

        <button
          className="small-container margin border-radius secondary-backround-color"
          onClick={toggleOpen}
        >
          <Plus size="20px"></Plus>
        </button>
      </div>
      {props.index < 3 && (
        <Droppable droppableId={props.id.toString()}>
          {(provided) => (
            <div
              className="border-radius"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.waitingAPI && (
                <div className="spinner-container">
                  <SpinnerCircular color="pink" size="5vw" />
                </div>
              )}
              {!props.waitingAPI && (
                <>
                  {books?.map((items, index) => (
                    <Card
                      cardColor={props.cardColor}
                      cn={props.cn}
                      bid={props.id}
                      id={items.id}
                      index={index}
                      key={items.id}
                      author={items.author}
                      title={items.title}
                      img_url={items.img_url}
                      tags={items.tags}
                      removeCard={props.removeCard}
                      card={items}
                    />
                  ))}
                  {provided.placeholder}
                </>
              )}
            </div>
          )}
        </Droppable>
      )}
      <Modal open={open} setOpen={setOpen} formTitle="Add book">
        <Form
          data={bookFields}
          bid={props.id}
          handleFetch={fetchFromAmazon}
          toggleOpen={toggleOpen}
          handleUpdate={handleAdd}
        />
      </Modal>
    </div>
  );
}
