import React, { useState, useEffect } from 'react'
import { getMovies } from '../../services/movies'
import { Link } from 'react-router-dom'
import TiltedCard from './TiltedCard'
import './AllMovies.css'

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

  // Function to get movie poster URL (you can replace this with actual poster URLs)
  const getMoviePoster = (movieId) => {
    // Using a placeholder image service - replace with actual movie poster URLs
    return `https://picsum.photos/300/400?random=${movieId}`
  }

  return (
    <div className='all-movies-container'>
      <div className='container'>
        <h2 className='page-header'>All Movies</h2>
        <div className='row'>
          {movies.map((movie) => (
            <div key={movie.id} className='col-md-4 mb-4'>
              <div className='movie-card-container'>
                <TiltedCard
                  imageSrc={getMoviePoster(movie.id)}
                  altText={`${movie.title} poster`}
                  captionText={movie.title}
                  containerHeight="500px"
                  containerWidth="100%"
                  imageHeight="500px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div>
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-release">Release: {new Date(movie.release).toLocaleDateString()}</p>
                      <Link to={`/home/add-review/${movie.id}`} className="review-button">
                        Review this Movie
                      </Link>
                    </div>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllMovies
