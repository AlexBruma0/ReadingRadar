import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../redux/slices/BooksSlice';
import Book from './Book';

const BigBoard = () => {
    const viewingId = localStorage.getItem("viewingId");
    const dispatch = useDispatch();
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [isGridView, setIsGridView] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('title');
    const allBooks = useSelector(state => state.books);

    useEffect(() => {
        const fetchCategoryBooks = async () => {
            if(viewingId) {
                await dispatch(fetchBooks(viewingId));
            }
            let categoryBooks = allBooks.boards[id];
            setBooks(categoryBooks);
        };
        fetchCategoryBooks();
    }, []); 

    useEffect(() => {
        let filtered = books.filter(book => book[filterBy].toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredBooks(filtered);
    }, [searchTerm, books, filterBy]);

    return (
        <div className={`category-books-container ${isGridView ? 'grid-layout' : 'list-layout'}`}>
            <div className="toolbar">
                <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
                <select onChange={e => setFilterBy(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
                <button onClick={() => setIsGridView(!isGridView)}>
                    Toggle Layout
                </button>
            </div>
            {filteredBooks?.map((book) => (
                <Book key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BigBoard;