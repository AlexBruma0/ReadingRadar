import React, { useEffect, useState } from "react";
import Card from "./Card";
import { SpinnerCircular } from "spinners-react";
import { Droppable } from "react-beautiful-dnd";
import { Plus, X } from "react-feather";
export default function Board(props) {
  return (
    <div className="large-container border-radius">
      <div className="space-between">
        <h2 className="exciting-text"> {props?.name}</h2>

        <button className="small-container margin border-radius secondary-backround-color">
          <Plus></Plus>
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
    </div>
  );
}
