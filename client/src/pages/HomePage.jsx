import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SpinnerCircular } from "spinners-react";
import { updateBoards, createBook, deleteBook, updateBook, deleteBookAPI, createBookAPI, moveBookToCategoryAPI, updateAPIBook, reorderAPIBook, fetchBooks } from '../redux/slices/BooksSlice';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sidebar from '../components/SideBar'


export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const viewingId = localStorage.getItem('viewingId')

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
      <div className="spinner-container">
        <SpinnerCircular color="pink" size="20vw" />
      </div>
    )
  }

  else return (
  <DragDropContext onDragEnd={handleDragEnd}>
    <Sidebar></Sidebar>
    <div className="grid-container--small">
      {Object.entries(boards).map(([boardId, books]) => (
        <Droppable droppableId={boardId} key={boardId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='large-container'>
              {books.map((book, index) => (
                <Draggable key={book._id} draggableId={book._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='small-container'
                    >
                      {/* Render your book card here */}
                      <div>{book.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
    
  </DragDropContext>

  );
}

