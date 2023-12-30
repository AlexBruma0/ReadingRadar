import React, { useEffect, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpinnerCircular } from "spinners-react";
import { updateBoards, createBook, deleteBook, updateBook, deleteBookAPI, createBookAPI, moveBookToCategoryAPI, updateAPIBook, reorderAPIBook, fetchBooks } from '../redux/slices/BooksSlice';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sidebar from '../components/SideBar'
import Board from '../components/Board';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../components/ThemeContext';
import { themes } from '../themes';



export default function HomePage() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const viewingId = localStorage.getItem('viewingId')
  const { theme } = useContext(ThemeContext);
  const currentThemeColors = themes[theme];

  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [containerHeight, setContainerHeight] = useState('100vh');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // Calculate the height for grid-container--small
    const height = `calc(100vh - ${navbarHeight}px)`;
    setContainerHeight(height);
  }, [navbarHeight]);

  useEffect(() => {
    if (viewingId) {
      dispatch(fetchBooks(viewingId));
    }
  }, [viewingId, dispatch]); 

  const boards = useSelector((state) => state.books.boards);
  const loadingStatus = useSelector(state => state.books.status)

  const handleDragEnd = async (result) => {
    if(viewingId !== userId){
      console.log('viewingId !== userId')
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
      const reorderedItem = { ...newBooks[source.index], order: destination.index };
      newBooks.splice(source.index, 1);
      newBooks.splice(destination.index, 0, reorderedItem);
  
      const newBoards = {
        ...boards,
        [source.droppableId]: newBooks,
      };
  
      dispatch(updateBoards(newBoards))
      const order = {
        new: destination.index,
        current: source.index,
        id: reorderedItem._id
      }
      dispatch(reorderAPIBook(order))
      return;
    }
    const startBooks = Array.from(startBoard);
    const finishBooks = Array.from(finishBoard);
    const movedItem = { ...startBooks[source.index], category: destination.droppableId };
    startBooks.splice(source.index, 1);
    finishBooks.splice(destination.index, 0, movedItem);
    const newBoards = {
      ...boards,
      [source.droppableId]: startBooks,
      [destination.droppableId]: finishBooks,
    };
    dispatch(updateBoards(newBoards))
    dispatch(moveBookToCategoryAPI({currentOrder: source.index, newOrder: destination.index, currentOrderId: movedItem._id, currentCategory: source.droppableId, newCategory: destination.droppableId}))
  };

  if(loadingStatus === "pending") {
    return (
      <div className="">
        loading...
      </div>
    )
  }

  else return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div style={{ paddingTop: `${navbarHeight}px` }}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div style={{ backgroundColor: currentThemeColors.secondary  }} className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} `}>
          <DragDropContext onDragEnd={handleDragEnd}>
          <div  className=" grid-container--small" style={{ height: containerHeight }} >
              {Object.entries(boards).map(([boardId, books]) => (
                <Board
                  key={boardId}
                  id={boardId}
                  books={books}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

