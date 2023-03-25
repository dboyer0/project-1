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
              onBookUpdate={()=>{}}
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
