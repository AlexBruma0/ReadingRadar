import React, { useEffect } from 'react';
import { logout } from '../redux/slices/Login'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchBooks, updateBoards, updateAPIBook } from '../redux/slices/Books';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      console.log("fetching books in front end")
      dispatch(fetchBooks(userId));
    }
  }, [userId, dispatch]); 

  const boards = useSelector((state) => state.books.boards);

  useEffect(() => {
    if(boards){
      // let books = [];
      console.log("updateing books in front end")
      // books.concat(boards.toBeRead, boards.reading, boards.read)
      // dispatch(updateAPIBooks(userId, userId))
    }
  }, [boards, dispatch])

  const handleDragEnd = (result) => {
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
      const [reorderedItem] = newBooks.splice(source.index, 1);
      newBooks.splice(destination.index, 0, reorderedItem);
  
      const newBoards = {
        ...boards,
        [source.droppableId]: newBooks,
      };
  
      dispatch(updateBoards(newBoards))
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
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
  <DragDropContext onDragEnd={handleDragEnd}>
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
  </DragDropContext>

  );
}

