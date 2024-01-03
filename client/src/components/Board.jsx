import React, { useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Plus } from "react-feather";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import Drag from "./Drag";
import ModalAddForm from "./ModalAddForm";

export default function Board({ boardBooks, category }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const boardMap = {
    toBeRead: "To Be Read",
    read: "Read",
    reading: "Reading",
  };

  const openDialog = () => setIsAddDialogOpen(true);
  const closeDialog = () => setIsAddDialogOpen(false);

  return (
    <div
      style={{ backgroundColor: currentThemeColors.primary }}
      className={`m-4 p-4 rounded-lg shadow-lg`}
    >
      {/* Board Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold`}>
          {boardMap[category]}{" "}
          <span className="ml-2 text-sm">{boardBooks.length}</span>
        </h2>
        <button
          style={{ backgroundColor: currentThemeColors.accent }}
          className={`p-2 rounded-full`}
          onClick={openDialog}
        >
          <Plus />
        </button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={category}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {boardBooks?.map((book, index) => (
              <Drag key={book._id} id={book._id} book={book} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Modal Form */}
      <ModalAddForm category={category} closeDialog={closeDialog} isOpen={isAddDialogOpen}/>

    </div>
  );
}
