// Importing the MovieItem component
import MovieItem from "./movieitem";

// Functional component to render a list of movies
const Movies = (props) => {
    // Mapping over the array of movies passed as a prop
    // For each movie, return a MovieItem component
    return props.myMovies.map(
        (movie) => {
            // Each MovieItem receives:
            // 1. The movie object as 'mymovie' prop
            // 2. A unique 'key' prop using the movie's ID
            // 3. The Reload function as 'Reload' prop for refreshing the list
            return <MovieItem mymovie={movie} key={movie._id} Reload={props.ReloadData} />;
        }
    );
}

// Exporting the Movies component for use in other parts of the application
export default Movies;
