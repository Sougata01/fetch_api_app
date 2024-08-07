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
			const response = await fetch('https://swapi.dev/api/films');
			if (!response.ok) {
				throw new Error('Something went wrong...Retrying');
			}

			const data = await response.json();
			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
			retryFetchMoviesHandler();
		}
		setIsLoading(false);

		function retryFetchMoviesHandler() {
			setStopButton(true)
			// here state is used to clear the timeout outside the function
			setFetchTimeOut(setTimeout(() => {
				fetchMoviesHandler();
			}, 5000)
			)
		}
	}, [])

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	function stopTimeOutHandler() {
		clearTimeout(fetchTimeOut);
		setStopButton(false)
	}

	let content = <p>No movies found</p>;

	if (error) {
		content = <p>{error}</p>;
	}

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie/>
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