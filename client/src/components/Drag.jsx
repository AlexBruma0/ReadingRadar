import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";
const Drag = (props) => {
  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
  });

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getItemStyle(provided.draggableProps.style)}
          >
            <Card book={props.book} />
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Drag;
