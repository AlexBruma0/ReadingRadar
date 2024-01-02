import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById, updateBook, deleteBook, updateAPIBook } from '../redux/slices/BooksSlice';
import ReactStars from 'react-rating-stars-component';

// Book component
const Book = ({ book, handleDelete, handleUpdate }) => (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white p-5 rounded-lg shadow-lg flex items-start">
        <img src={book.img_url} alt={book.title} className="w-48 h-48 rounded-lg mr-4" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-gray-700">{book.author}</p>
          <div className="flex items-center my-2">
            <div className="bg-yellow-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-800">
              {book.rating}
            </div>
                    <div className="flex items-center my-0">
          <ReactStars
            count={5}
            value={book.rating}
            size={24}
            isHalf={true}
            edit={false}
            activeColor="#ffd700"
          />
        </div>
          </div>
          <p className="text-gray-600">{book.notes}</p>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 my-2">
            {book.category}
          </span>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleUpdate(book)}
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Edit Post
            </button>
            <button
              onClick={() => handleDelete(book._id)}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Delete Post
            </button>
            <button
              // Handle comment logic here
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  


export default function BookPost() {
    const { id: bookId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (bookId) {
        dispatch(fetchBookById(bookId));
      }
    }, [bookId, dispatch]);
    
    const book = useSelector((state) => state.books.currentBook);
    
    const handleUpdate = async () => {
      dispatch(updateBook(book));
      dispatch(updateAPIBook(book));
    };
    
    const handleDelete = async () => {
      dispatch(deleteBookAPI(bookId));
      dispatch(deleteBook(bookId));
      navigate("/home");
    };
  
    const handleComment = () => {
      // Logic to handle adding a comment
    };
  
    if (!book) {
      return <div>Loading...</div>;
    }
    console.log(book)
    return (
        <Book book={book} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      );
  };