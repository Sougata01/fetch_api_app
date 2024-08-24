import React from 'react';
import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.movieTitle}</h2>
      <p>{props.openingText}</p>
      <h3>{props.releaseDate}</h3>
      <button style={{backgroundColor:"#ff0000"}} onClick={() => props.deleteMovie(props.id)}>Delete</button>  {/* Calling the delete function */}
    </li>
  );
};

export default Movie;