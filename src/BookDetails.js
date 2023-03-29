import { useLocation, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    // accessing state which was passed from Link component
    const location = useLocation();
    const navigate = useNavigate();

    console.log("State passed from Link: ", location);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <button onClick={goBack}>Back</button>

            <br />
            <br />

            <img src={location.state.imageLinks.thumbnail} alt="book cover" />
            <h1>Title: {location.state.title}</h1>
            <h2>Sub Title: {location.state.subtitle}</h2>
            <h3>Shelf: {location.state.shelf}</h3>

            <p><strong>Description: </strong> {location.state.description}</p>
        </div>
    );
}

export default BookDetails;