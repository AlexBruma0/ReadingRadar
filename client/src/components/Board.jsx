import React, { useEffect, useState } from "react";
import Card from "./Card";
import { SpinnerCircular } from "spinners-react";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
import Modal from "./Modal";
import Form from "./Form";

export default function Board(props) {
  const [open, setOpen] = useState(false);
  const uri = "http://localhost:8081/";

  const toggleOpen = () => {
    setOpen(!open);
  };
  const fetchFromAmazon = async (asin) => {
    const response = await fetch(`${uri}asin/${asin}`);
    const json = await response.json();
    return json
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
        <h2 className="underline"> {props?.name}</h2>

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
                  {props.card?.map((items, index) => (
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
                      updateCard={props.updateCard}
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
        />
      </Modal>
    </div>
  );
}
