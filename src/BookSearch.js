import './App.css';
import PropTypes from "prop-types";

const BookSearch = ({ savedBooks, onBookUpdate }) => {
  return (
    <div className="search-books">
        <div className="search-books-bar">
            <a
                className="close-search"
                // onClick={() => setShowSearchpage(!showSearchPage)}
            >
                Close
            </a>

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
    savedBook: PropTypes.object.isRequired,
    onBookUpdate: PropTypes.func.isRequired
};

export default BookSearch;
