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
    // call setBooks to update book state
    // concat book to array of books

    BooksAPI.update(book, shelf).then(() => {
      let newBook = book
      console.log("newBook before updating state: ", newBook)
      newBook.shelf = shelf
      console.log("newBook with updated shelf: ", newBook)
      // remove book from state
      // add the updated book to state
      // this.setState((prevState) => ({ books: prevState.books.filter(b => b.id !== book.id).concat(newBook) }))
      setBooks((books) => ({ books: books.filter(b => b.id !== book.id).concat(newBook) }))
      console.log("Books array after updating state: ", books)
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
