import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import Editable from "../Editable/Editable";
import { SpinnerCircular } from "spinners-react";
import { Droppable } from "react-beautiful-dnd";

export default function Board(props) {


  return (
    <div className="board" id={`board${props.index}`}>
      <div className="board__top">
          <div>
            <p
              className="board__title"
            >
              <span className="board-title">{props?.name}</span>
              <span className="total__cards">{props.card?.length}</span>
            </p>
          </div>

      </div>
      {props.index < 2 && (
        <Droppable droppableId={props.id.toString()}>
          {(provided) => (
            <div
              className="board__cards"
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
      {props.index === 2 && (
        <div className="board2-cards-container">
          <div>
            <Droppable droppableId={`${props.id.toString()}1`}>
              {(provided) => (
                <div
                  className="board__cards"
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
                        <>
                          {index < Math.ceil(props.card.length / 2) && (
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
                          )}
                        </>
                      ))}
                      {provided.placeholder}
                    </>
                  )}
                </div>
              )}

            </Droppable>
          </div>
          <div>
            <Droppable droppableId={props.id.toString()}>
              {(provided) => (
                <div
                  className="board__cards"
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
                        <>
                          {index >= Math.ceil(props.card.length / 2) && (
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
                          )}
                        </>
                      ))}
                      {provided.placeholder}
                    </>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
        {props.index === 3  && (
        <Droppable droppableId={props.id.toString()}>
          {(provided) => (
            <div
              className="board__cards"
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

      <div className="board__footer">
        <Editable
          board3={props.index === 3 ? "board3" : ""}
          name={"Add Book"}
          btnName={"Add Book"}
          placeholder={"Enter ISBN/ASIN"}
          onSubmit={(value) => props.addCard(value, props.id)}
        />
      </div>
    </div>
  );
}
