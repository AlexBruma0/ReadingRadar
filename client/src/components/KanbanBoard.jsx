import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  updateBoards,
  moveBookToCategoryAPI,
  reorderAPIBook,
  fetchBooks,
  createBoard,
} from "../redux/slices/BooksSlice";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "../components/Board";
import { SpinnerCircular } from "spinners-react";
import { ThemeContext } from "../components/ThemeContext";
import { themes } from "../themes";
import { Plus } from "react-feather";
import ModalAddForm from "../components/ModalAddForm";

export default function KanbanBoard() {
  const userId = localStorage.getItem("userId");
  const viewingId = localStorage.getItem("viewingId");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Add loading state
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the viewingId is the same as the userId
  const isOwner = userId === viewingId;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNewBoard = () => {
    const newBoardName = prompt("Enter new Category name");
    if (newBoardName) {
      dispatch(createBoard(newBoardName));
    }
  };

  useEffect(() => {
    const fetchBooksData = async () => {
      setLoading(true); // Set loading to true before fetching
      if (viewingId) {
        await dispatch(fetchBooks(viewingId));
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchBooksData();
  }, [viewingId, dispatch]);

  const boards = useSelector((state) => state.books.boards);

  const handleDragEnd = async (result) => {
    if (viewingId !== userId) {
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
    <div className="">
      <div className="flex">
        <button
          className="flex px-4 py-2 font-bold rounded hover:bg-opacity-80 transition-colors duration-200  ml-4"
          style={{ backgroundColor: currentThemeColors.accent }}
          onClick={createNewBoard}
        >
          <Plus />
          Category
        </button>
        <button
          className="flex px-4 py-2 font-bold border-2 rounded hover:bg-opacity-80 transition-colors duration-200  ml-4"
          style={{ backgroundColor: currentThemeColors.primary }}
          onClick={openModal}
        >
          <Plus />
          Book
        </button>
      </div>

      <div className={`grid-container--small`}>
        {loading ? (
          <div
            className="center-text"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <SpinnerCircular color="black" size="20vh" />
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            {Object.entries(boards).map(([boardId, books]) => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Add this line */}
                <Board
                  key={boardId}
                  category={boardId}
                  boardBooks={books}
                  isOwner={isOwner}
                />
              </div>
            ))}
          </DragDropContext>
        )}
      </div>
      {/* Modal Form */}
      <ModalAddForm
        category={null}
        closeDialog={closeModal}
        isOpen={isModalOpen}
      />
    </div>
  );
}
