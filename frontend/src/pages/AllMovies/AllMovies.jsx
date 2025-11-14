import React, { useState, useEffect } from 'react'
import { getMovies } from '../../services/movies'

function AllMovies() {
  const [movies, setMovies] = useState([])
  const [layout, setLayout] = useState('grid')

  const getMoviesList = async () => {
    const response = await getMovies()
    console.log(response['data']);
    if (response['status'] == 'success') {
      setMovies(response['data'])
    }
  }

  useEffect(() => {
    // load the Movies automatically when this component is launched
    getMoviesList()
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
                  {/* <p className='card-text'>Release Date: {movie.release}</p> */}
                  <button className="btn btn-primary" >
                    Review this Movie
                  </button>
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
