import './App.css';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BookSearch = ({ savedBooks, onBookUpdate }) => {
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
                />
            </div>
        </div>

        <div className="search-books-results">
            <ol className="books-grid"></ol>
        </div>
    </div>
  );
}

BookSearch.propTypes = {
    savedBooks: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
};

export default BookSearch;
