import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/MovieInfo.css"

const MovieInfo = () => {

    let emptyMovie = {
        title: '',
        year: 0,
        director: '',
        genres: [''],
        description: '',
        poster: '',
        length: '',
        stars: ['']
    };

    const [movie, setMovie] = useState(emptyMovie);
    const { id } = useParams()

    useEffect(async () => {

        await fetch(`http://localhost:3000/movie/${id}`)
            .then(response => response.json())
            .then(data => setMovie(data));
    }, []);

    return (
        <div className="m-container">
            <img src={`${movie.poster}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={movie.title} className="poster" />
            <div className='m-details'>
                <h1 className='m-title'>{movie.title}</h1>
                <div className='m-time'> <strong>{movie.year} </strong> / {movie.length}</div>
                <h4 className='m-director'> Director <strong>{movie.director}</strong></h4>
                <div className='m-genres'> {movie.genres.join(" / ")} </div>
                <div className='m-desc'>{movie.description}</div>
                <div className='m-stars'>{movie.stars.join(" ⭐ ")}</div>

            </div>

        </div>
    )
};

export default MovieInfo;