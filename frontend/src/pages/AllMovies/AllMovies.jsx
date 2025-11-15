import React, { useState, useEffect } from 'react'
import { getMovies } from '../../services/movies'
import { Link } from 'react-router-dom'

function AllMovies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies()
      if (response.status === 'success') {
        setMovies(response.data)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div>
      <div className='container'>
        <h2 className='page-header'>All Movies</h2>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{movie.title}</h5>
                  <p className='card-text'>Release Date: {new Date(movie.release).toLocaleDateString()}</p>
                  <Link to={`/home/add-review/${movie.id}`} className="btn btn-primary">
                    Review this Movie
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllMovies
