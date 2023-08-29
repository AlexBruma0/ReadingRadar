import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  const navigate = useNavigate();
  return (
    <Draggable
      key={props.id?.toString()}
      draggableId={props.id?.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="small-container space-between border-radius"
            style={getItemStyle(provided.draggableProps.style)}
            onClick={() =>
              navigate(`/book/${props.id}`, {
                state: {
                  bid:props.bid,
                  card: {
                    title: props.title,
                    id: props.id,
                    author: props.author,
                    rating: props.card.myRating,
                    cover_img: props.img_url,
                    notes: props.card.notes,
                  },
                },
              })
            }
          >
            <div className="text-container">
              <h2>{props.title}</h2>
              <div className="author-container">
                <i>{props.author}</i>
                <div className="stars">
                  <Rating
                    readonly="true"
                    initialValue={props.card.myRating}
                    allowFraction="true"
                    size="20px"
                    fillColor={props.cardColor}
                    emptyColor="#f2f2f3"
                  />
                </div>
              </div>
            </div>
            <div className="image">
              <img src={props.img_url} alt="" />
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
