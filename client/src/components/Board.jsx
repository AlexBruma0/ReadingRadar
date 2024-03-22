import React, { useState, useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Plus } from "react-feather";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import Drag from "./Drag";
import ModalAddForm from "./ModalAddForm";

export default function Board({ boardBooks, category, isOwner }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const convertCamelCaseToText = (camelCase) => {
    return camelCase
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const openDialog = () => setIsAddDialogOpen(true);
  const closeDialog = () => setIsAddDialogOpen(false);

  return (
    <div
      style={{
        backgroundColor: currentThemeColors.primary,
        scrollbarWidth: 'none', /* For Firefox */
        msOverflowStyle: 'none', /* For Internet Explorer and Edge */
        overflowY: 'scroll',
        maxHeight: '30rem'
      }}
      className={`item m-4 p-4 rounded-lg shadow-lg overflow-y-scroll`}
    >
      {/* Board Header */}
      <div className="flex justify-between items-center mb-4 rounded-lg" style={{position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#fff'}}>
        <h2 className={`text-xl font-bold flex items-center `}>
          <div
            className="mr-2 flex h-7 w-7 rounded-full justify-center items-center text-lg font-bold shadow-lg p-2"
            style={{
              backgroundColor: currentThemeColors.accent,
            }}
          >
            {boardBooks.length}
          </div>
          {convertCamelCaseToText(category)}{" "}
        </h2>
        {isOwner && (
          <button
            style={{ backgroundColor: currentThemeColors.accent }}
            className="p-2 rounded-full text-lg font-bold shadow-lg"
            onClick={openDialog}
          >
            <Plus />
          </button>
        )}
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
      <ModalAddForm
        category={category}
        closeDialog={closeDialog}
        isOpen={isAddDialogOpen}
      />
    </div>
  );
}
