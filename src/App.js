import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [stopButton, setStopButton] = useState(false)
	const [fetchTimeOut, setFetchTimeOut] = useState(null)



	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('https://react-fetch-api-95481-default-rtdb.firebaseio.com/movies.json');
			if (!response.ok) {
				throw new Error('Something went wrong');
			}
			const data = await response.json();
			console.log(data);
			const loadedMovies = []
			for (const key in data) {
				loadedMovies.push({
					id: key,
					movieTitle: data[key].movieTitle,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				})
			}
			setMovies(loadedMovies)
			// const transformedMovies = data.map((movieData) => {
			//   return {
			//     id: movieData.episode_id,
			//     title: movieData.title,
			//     openingText: movieData.opening_crawl,
			//     releaseDate: movieData.release_date,
			//   };
			// });
			// setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
			retryFetchMoviesHandler();
		}
		setIsLoading(false);


		function retryFetchMoviesHandler() {
			setStopButton(true)
			setFetchTimeOut(setTimeout(() => {
				fetchMoviesHandler();
			}, 2000)
			)
		}
	}, [])

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler,]);

	async function addMovieHandeler(movie) {
		const response = await fetch('https://react-fetch-api-95481-default-rtdb.firebaseio.com/movies.json', {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json()
		fetchMoviesHandler()
		console.log(data)
	}

	async function deleteMovieHandler(movieId) {
		try {
			await fetch(`https://react-fetch-api-95481-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
				method: 'DELETE',
			});
			setMovies((prevMovies) => {
				return prevMovies.filter((movie) => movie.id !== movieId);
			});
		} catch (error) {
			setError('Failed to delete the movie.');
		}
	}

	function stopTimeOutHandler() {
		clearTimeout(fetchTimeOut);
		setStopButton(false)
	}

	let content = <p>No movies found</p>;

	if (error) {
		content = <p>{error}</p>;
	}

	if (movies.length > 0) {
		content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie AddMovie={addMovieHandeler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{content}
				{stopButton && <button onClick={stopTimeOutHandler}>stop</button>}
			</section>
		</React.Fragment>
	);
}

export default App;