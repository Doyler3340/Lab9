// Importing required components and modules
import Movies from "./movies"; // Component to display a list of movies
import { useEffect, useState } from "react"; // React hooks for state management and lifecycle methods
import axios from "axios"; // Library for making HTTP requests

// Functional component to manage and display the movie list
const Read = () => {
  // useState hook to manage the 'movies' state, initialized as an empty array
  const [movies, setMovies] = useState([]);

  // Function to load movie data from the server
  const loadData = () => {
    // Sending a GET request to the API endpoint
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        console.log(response.data); // Log the response data for debugging
        setMovies(response.data.movies); // Update the 'movies' state with the fetched data
      })
      .catch((error) => {
        console.log(error); // Log any errors that occur during the request
      });
  }

  // useEffect hook to load movie data when the component is mounted
  useEffect(() => {
    loadData(); // Call the loadData function to fetch movie data
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // Rendering the component
  return (
    <div>
      {/* Header message */}
      <h3>Hello from read component!</h3>

      {/* Movies component to display the list of movies */}
      {/* Passes the 'movies' state as 'myMovies' prop and the 'loadData' function as 'ReloadData' prop */}
      <Movies myMovies={movies} ReloadData={loadData} />
    </div>
  );
}

// Exporting the Read component for use in other parts of the application
export default Read;
