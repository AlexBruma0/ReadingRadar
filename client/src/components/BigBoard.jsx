import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../redux/slices/BooksSlice";
import Book from "./Book";

const BigBoard = () => {
  const viewingId = localStorage.getItem("viewingId");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const allBooks = useSelector((state) => state.books);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      if (viewingId) {
        await dispatch(fetchBooks(viewingId));
      }
      let categoryBooks = allBooks.boards[id];
      setBooks(categoryBooks);
    };
    fetchCategoryBooks();
  }, []);

  useEffect(() => {
    let filtered = books.filter((book) =>
      book[filterBy]?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    filtered.sort((a, b) => {
      if (sortBy === "rating") {
        return ((a[sortBy] || 0) - (b[sortBy] || 0)) * -1;
      } else {
        if ((a[sortBy] || "").toLowerCase() < (b[sortBy] || "").toLowerCase())
          return -1;
        if ((a[sortBy] || "").toLowerCase() > (b[sortBy] || "").toLowerCase())
          return 1;
        return 0;
      }
    });
    setFilteredBooks(filtered);
  }, [searchTerm, books, filterBy, sortBy]);

  return (
    <div>
<div className="mt-7 flex justify-between items-center ml-7">
      <div className="flex">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          onChange={(e) => setFilterBy(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <div className="flex items-center space-x-2">
          <span className="ml-3">Sort By:</span>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="title">Title</option>
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
        {filteredBooks?.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BigBoard;
