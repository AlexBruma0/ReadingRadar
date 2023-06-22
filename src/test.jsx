import { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (draggableStyle) => ({
    ...draggableStyle
  });

const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
}));



function Test() {

  const [data,setData] = useState(getItems(10))

  const reorder = ( startIndex, endIndex) => {
    const [removed] = data.splice(startIndex, 1);
    data.splice(endIndex, 0, removed);
  };

  const onDragEnd= (result) => {
    if (!result.destination) {
      return;
    }
    reorder(
      result.source.index,
      result.destination.index
    );
  }
  
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Test;
