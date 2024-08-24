import React, { useState } from 'react'
import classes from './AddMovie.module.css';

const AddMovie = (props) => {

    const [show, setShow] = useState(false)
    const [movieTitle, setMovieTitle] = useState('')
    const [openingText, setOpeningText] = useState('')
    const [releaseDate, setReleaseDate] = useState('')

    const titleChangeHandler = (event) => {
        setMovieTitle(event.target.value)
    }
    const openingTextChangeHandler = (event) => {
        setOpeningText(event.target.value)
    }
    const releaseDateChangeHandler = (event) => {
        setReleaseDate(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const NewMovieObj = {
            movieTitle,
            openingText,
            releaseDate
        }

        props.AddMovie(NewMovieObj)

        setMovieTitle('')
        setOpeningText('')
        setReleaseDate('')
        setShow(false)
    }

    return (
        <div>
            {show &&
                <form onSubmit={submitHandler} className={classes.formbody}>
                    <label className={classes.inputTitle} htmlFor='title'>Title:</label><br /><br />
                    <input className={classes.formInput} onChange={titleChangeHandler} value={movieTitle} type='text' id='title' /><br /><br />

                    <label className={classes.inputTitle} htmlFor='openingText'>Opening Text:</label><br /><br />
                    <textarea className={classes.formInput} id='openingText' onChange={openingTextChangeHandler} value={openingText} rows="4" cols="50" /><br /><br />

                    <label className={classes.inputTitle} htmlFor='releaseDate'>Release Date:</label><br /><br />
                    <input className={classes.formInput} type="text" id='releaseDate' onChange={releaseDateChangeHandler} value={releaseDate} /><br /><br />

                    <div className={classes.buttons}>
                        <button type="submit">Add Movie</button>
                        <button className={classes.cancelBtn} onClick={() => setShow(false)}>Cancel</button>
                    </div>
                </form>}
            {!show && <button onClick={() => setShow(true)}>Add Movie</button>}
        </div>
    )
}

export default AddMovie