// Importing necessary modules and components
import { useEffect } from "react"; // React hook to handle side effects
import Card from 'react-bootstrap/Card'; // Bootstrap Card component for styling
import { Link } from "react-router-dom"; // Link component for navigation
import Button from 'react-bootstrap/Button'; // Bootstrap Button component for styling
import axios from "axios"; // Axios for making HTTP requests

// Functional component to render a single movie item
const MovieItem = (props) => {

    // Function to handle the deletion of a movie
    const handleDelete = (e) => {
      e.preventDefault(); // Prevents the default form submission behavior

      // Sending a DELETE request to the server with the movie ID
      axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
          .then((res) => {
            console.log(res.data); // Log the response data
            props.Reload(); // Call the Reload function passed from the parent component to refresh the movie list
          })
          .catch(); // Handle errors (currently empty, could add error handling here)
    }

    // useEffect hook to log the movie item when the component updates
    useEffect(() => {
      console.log("Movie Item:", props.mymovie); // Log the movie data for debugging
    }, [props.mymovie]); // Dependency array: runs the effect only when the `mymovie` prop changes

    // Render the movie item as a card
    return (
      <div>
        <Card>
          {/* Display the movie title in the card header */}
          <Card.Header>{props.mymovie.title}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              {/* Display the movie's poster */}
              <img src={props.mymovie.poster} alt={props.mymovie.title} />
              {/* Display the release year in the footer */}
              <footer>{props.mymovie.year}</footer>
            </blockquote>
          </Card.Body>
          {/* Link to the edit page for the movie, with the movie ID in the URL */}
          <Link className="btn btn-primary" to={"/edit/" + props.mymovie._id}>Edit</Link>
          {/* Button to delete the movie */}
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Card>
      </div>
    );
}

// Exporting the component for use in other parts of the application
export default MovieItem;
