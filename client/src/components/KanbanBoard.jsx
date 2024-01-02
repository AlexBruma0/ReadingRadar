import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  updateBoards,
  moveBookToCategoryAPI,
  reorderAPIBook,
  fetchBooks,
} from "../redux/slices/BooksSlice";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "../components/Board";

export default function KanbanBoard() {
  const userId = localStorage.getItem("userId");
  const viewingId = localStorage.getItem("viewingId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (viewingId) {
      dispatch(fetchBooks(viewingId));
    }
  }, [viewingId, dispatch]);

  const boards = useSelector((state) => state.books.boards);

  const handleDragEnd = async (result) => {
    if (viewingId !== userId) {
      console.log("viewingId !== userId");
      return;
    }
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const startBoard = boards[source.droppableId];
    const finishBoard = boards[destination.droppableId];
    if (startBoard === finishBoard) {
      const newBooks = Array.from(startBoard);
      const reorderedItem = {
        ...newBooks[source.index],
        order: destination.index,
      };
      newBooks.splice(source.index, 1);
      newBooks.splice(destination.index, 0, reorderedItem);

      const newBoards = {
        ...boards,
        [source.droppableId]: newBooks,
      };

      dispatch(updateBoards(newBoards));
      const order = {
        new: destination.index,
        current: source.index,
        id: reorderedItem._id,
      };
      dispatch(reorderAPIBook(order));
      return;
    }
    const startBooks = Array.from(startBoard);
    const finishBooks = Array.from(finishBoard);
    const movedItem = {
      ...startBooks[source.index],
      category: destination.droppableId,
    };
    startBooks.splice(source.index, 1);
    finishBooks.splice(destination.index, 0, movedItem);
    const newBoards = {
      ...boards,
      [source.droppableId]: startBooks,
      [destination.droppableId]: finishBooks,
    };
    dispatch(updateBoards(newBoards));
    dispatch(
      moveBookToCategoryAPI({
        currentOrder: source.index,
        newOrder: destination.index,
        currentOrderId: movedItem._id,
        currentCategory: source.droppableId,
        newCategory: destination.droppableId,
      }),
    );
  };

  return (
    <div className={`grid-container--small`}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(boards).map(([boardId, books]) => (
          <Board key={boardId} category={boardId} boardBooks={books} />
        ))}
      </DragDropContext>
    </div>
  );
}
