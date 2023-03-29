import './App.css';
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from 'react-throttle'
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

const BookSearch = ({ savedBooks, onBookUpdate }) => {

    const [ query, setQuery ] = useState("");
    const [ searchedBooks, setSearchBooks ] = useState([]);

    const handleChange = (typedQuery) => {
        console.log("Typed Query: ", typedQuery);

        // a query is present
        if (typedQuery) {
            // add query to state
            setQuery(typedQuery);
      
            // query api for specified query
            BooksAPI.search(typedQuery, 20).then((queriedBooks) => {

              console.log("[API] - Books returned from server: ", queriedBooks);

              // cycle through the savedBooks
              // for each queriedBooks, if its id matches an id from the savedBooks, replace book
              savedBooks.map((book, index) => {
                for (let [index, queriedBook] of queriedBooks.entries()) {
                  if (book.id === queriedBook.id) {
                    // index = index of element to be removed
                    // 1 = # of elements to be removed
                    // book = the element to input in the open slot
                    queriedBooks.splice(index, 1, book)
                  }
                }
                return null
              })
      
              // cycle through the queriedBooks
              // if there is no shelf, set the shelf to "none"
              queriedBooks.forEach(book => {
                if(!book.shelf){
                  book.shelf = "none"
                }
              })
      
              setSearchBooks(queriedBooks);

              console.log("[STATE] - Books saved to state and remote server: ", searchedBooks);
              
            }).catch((error) => {
              // if an invalid search term exists, set state to blank array
              setSearchBooks([]);
              // dump error to console
              console.log("Error", error)
            })
      
          } else {
            // clear query
            setQuery("");
          }
    }

    let showingBooks
    if(query) {
        showingBooks = searchedBooks
        console.log("Has showing books:", showingBooks)
    } else {
        showingBooks = []
        console.log("No showing books:", showingBooks)
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
                    <Debounce time="400" handler="onChange">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            onChange={event => handleChange(event.target.value)}
                            autoFocus
                        />
                    </Debounce>
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">

                    {showingBooks.length
                        ?
                            /* has books to show */
                            showingBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book} shelf={book.shelf} onBookUpdate={onBookUpdate} />
                                </li>
                            ))    
                        :
                            /* no books to show */
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
