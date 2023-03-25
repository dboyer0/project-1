import './App.css';
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import BookSearch from "./BookSearch";

const App = () => {

  const [books, setBooks] = useState([]);

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
            <BookShelf />
          }
        />

        <Route
          path="/search"
          element={
            <BookSearch />
          }
        />        
      </Routes>
    </div>
  );
}

export default App;
