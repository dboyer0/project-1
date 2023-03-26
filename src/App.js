import './App.css';
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import BookSearch from "./BookSearch";

const App = () => {

  const [books, setBooks] = useState([]);

  /* onComponentMount */
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const onBookUpdate = (book, shelf) => {
    // pass in book and new shelf
    // create new book with updated shelf
    // PUT /update(book,shelf)
    // get response
    // create temp book to model the new books update shelf
    // filter out the book being updates from current books state
    // reinsert temp book into state array by calling setBooks to update book state

    BooksAPI.update(book, shelf).then(() => {
      // create updated book
      let newBook = book
      newBook.shelf = shelf
      // remove book from state
      // add the updated book to state
      let updatedBooksList = books.filter(b => b.id !== book.id).concat(newBook)
      setBooks(updatedBooksList);

    })
  }

  console.log("Books List: ", books);

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <BookShelf
              currentlyReading={books.filter(book => book.shelf === "currentlyReading")}
              read={books.filter(book => book.shelf === "read")}
              wantToRead={books.filter(book => book.shelf === "wantToRead")}
              onBookUpdate={onBookUpdate}
            />
          }
        />

        <Route
          path="/search"
          element={
            <BookSearch
              savedBooks={books}
              onBookUpdate={()=>{}}
            />
          }
        />        
      </Routes>
    </div>
  );
}

export default App;
