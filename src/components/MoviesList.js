import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          movieTitle={movie.movieTitle}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          deleteMovie={props.onDeleteMovie} 
        />
      ))}
    </ul>
  );
};

export default MovieList;