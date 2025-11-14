import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/user';
import { useAuth } from '../../provider/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const onLogin = async () => {
    if (email.length == 0) {
      toast.warning("Please enter Email!!")
    } else if (password.length == 0) {
      toast.warning("Please enter Password!!")
    }
    else {
      const response = await login(email, password)
      if (response['status'] == 'success') {
        toast.success('login successful')

        // get the token from response and cache it in local storage
        localStorage.setItem('token', response['data']['token'])
        // localStorage.setItem('firstName', response['data']['firstName'])
        // localStorage.setItem('lastName', response['data']['lastName'])

        // set the logged in user information
        setUser({
          firstName: response['data']['firstName'],
          lastName: response['data']['lastName'],
        })

        // navigate to the PropertyListing page
        navigate('/home/allMovies')
      } else {
        toast.error(response['error'])
      }
    }
  }

  return (
    <div className='container'>
      <h2 className='page-header'>Login</h2>

      <div className='login-container'>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type='email'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <input
            type='checkbox'
            className='me-2'
          />
          <label htmlFor=''>Remember me</label>
        </div>
        <div className='mb-3'>
          {/* <button className='btn btn-link'>Forgot password?</button> */}
          {/* Don't have an account yet? <Link to='/signup'>Register here</Link> */}
        </div>
        <div className='mb-3'>
          <button
            onClick={onLogin}
            className='btn btn-success'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
