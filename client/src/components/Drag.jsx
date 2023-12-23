import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const Drag = (props) => {
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  const navigate = useNavigate();
  return (
    <Draggable
      key={props.id}
      draggableId={props.id}
      index={props.index}
    >
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getItemStyle(provided.draggableProps.style)}
          >
            <Card
              book={props.book}
            />
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Drag;