import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../provider/AuthProvider'

function Navbar() {
  // get the reference of navigate function
  const navigate = useNavigate()

  // get setUser from AuthContext
  const { setUser } = useAuth()

  const onLogout = () => {
    // remove all the cached items
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')

    // set the user to null
    setUser(null)

    // redirect to Login page
    navigate('/login')
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-primary'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/home/allMovies'
        >
          Movie Reviews
        </Link>

        <div
          className='collapse navbar-collapse'
          id='navbarNav'
        >
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/allMovies'
              >
                All Movies
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/myReviews'
              >
                My Reviews
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/sharedWithMe'
              >
                Shared With Me
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home/allReviews'
              >
                All Reviews
              </Link>
            </li>

            <li className='nav-item'>
              <button
                onClick={onLogout}
                className='nav-link display-end'
                aria-current='page'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
