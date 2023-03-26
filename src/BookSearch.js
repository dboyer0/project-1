import './App.css';
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";

const BookSearch = ({ savedBooks, onBookUpdate }) => {

    const [ query, setQuery ] = useState("");
    const [ searchedBooks, setSearchBooks ] = useState([]);

    const handleChange = (e) => {
        setQuery(e.target.value);

        console.log("query: ", e.target.value);
    }

    console.log("Query current state: ", query);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                >
                    Close
                </Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">
                    {savedBooks.map(book => (
                        <li key={book.id}>
                            <Book book={book} shelf={book.shelf} onBookUpdate={onBookUpdate} />
                        </li>
                    ))}                
                </ol>
            </div>
        </div>
    );
}

BookSearch.propTypes = {
    savedBooks: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
};

export default BookSearch;
