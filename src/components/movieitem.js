import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const MovieItem = (props)=> {


    const handleDelete = (e) => {
      e.preventDefault();

      axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
          .then((res)=> {
            console.log(res.data);
            props.Reload();
          })
          .catch();

    }
  

  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <Link className="btn btn-primary" to={"/edit/"+props.mymovie._id}>Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default MovieItem;
