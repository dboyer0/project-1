import './App.css';
import { Route, Routes } from "react-router-dom";
import BookShelf from "./BookShelf";
import BookSearch from "./BookSearch";

function App() {
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
