import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooks2 } from "../redux/slices/BooksSlice";
import Book from "./Book";
import { useNavigate } from "react-router-dom";

const BigBoard = () => {
  const viewingId = localStorage.getItem("viewingId");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("rating");
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const navigate = useNavigate();
  const [groupBy, setGroupBy] = useState("none");
  const [isGridView, setIsGridView] = useState(true);


  useEffect(() => {
    const fetchCategoryBooks = async () => {
      if (viewingId) {
        await dispatch(fetchBooks2({userId: viewingId, category: id, titleFilter: titleFilter, authorFilter: authorFilter, sortBy: sortBy}));
      }
      
    };
    fetchCategoryBooks();
    console.log('books: ', books)
  }, [viewingId, id, sortBy, titleFilter, authorFilter, dispatch]);


  const books = useSelector((state) => state.books.boards[id]);

  return (
    <div>
    <div className="mt-7 flex justify-between items-center ml-7">
      <div className="flex">
        <input
            type="text"
            placeholder="Search by title..."
            onChange={(e) => setTitleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
        />
        <input
            type="text"
            placeholder="Search by author..."
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
        />
        <div className="flex items-center space-x-2">
          <span className="ml-3">Sort By:</span>
          <select
            onChange={(e) => setSortBy(e.target.value.toLowerCase())}
            className="border border-gray-300 rounded"
          >
            <option value="rating">Rating</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
        <span className="ml-3">Group By:</span>
        <select
          onChange={(e) => setGroupBy(e.target.value)}
          className="border border-gray-300 rounded"
        >
          <option value="none">None</option>
          <option value="author">Author</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      </div>
      <h1 className="text-5xl font-bold text-gray-700"> <i>{id}</i></h1>
      <div className="flex items-center">
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" id="toggle" className="sr-only" onClick={() => setIsGridView(!isGridView)} />
            <div className={`block w-14 h-8 rounded-full ${isGridView ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium mr-4">
            {isGridView ? 'List view' : 'Grid view'}
          </div>
        </label>
      </div>
    </div>
    <div className={`${isGridView ? "grid-layout" : "list-layout"}`}>
          {books?.map((book) => (
            <div className="transform transition-transform hover:scale-105" onClick={()=> navigate(`/book/${book._id}`)}>
              <Book key={book._id} book={book} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BigBoard;
