import './App.css';
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

const BookSearch = ({ savedBooks, onBookUpdate }) => {

    const [ query, setQuery ] = useState("");
    const [ searchedBooks, setSearchBooks ] = useState([]);

    const handleChange = (e) => {
        console.log("query: ", e.target.value);

        if(query){
            // set query state
            setQuery(e.target.value);

            // call server for books that match
            BooksAPI.search(query, 10).then((queriedBooks) => {
                console.log("Queried books: ", queriedBooks);

                // cycle through the queriedBooks
                // if there is no shelf, set the shelf to "none"
                queriedBooks.forEach(book => {
                    if(!book.shelf){
                        book.shelf = "none"
                    }
                })
        
                // this.setState({ searchedBooks: queriedBooks })
                setSearchBooks(queriedBooks);
  
            })

        } else {
            /* empty query */
            setQuery("");
        }
    }

    console.log("Query current state: ", query);

    let showingBooks
    if(query){
        showingBooks = searchedBooks.filter(book => book.id !== query.id)
    } else {
        showingBooks = []
    }

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
                        autoFocus
                    />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">

                    {showingBooks.length
                        ?
                            showingBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book} shelf={book.shelf} onBookUpdate={onBookUpdate} />
                                </li>
                            ))    
                        :
                            <li>
                                <h1>No search results available</h1>
                            </li>
                    }

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
