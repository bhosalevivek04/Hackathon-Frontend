import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/user.js'

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const onRegister = async () => {
    if (firstName.length == 0) {
      toast.warning('Please enter first name')
    } else if (lastName.length == 0) {
      toast.warning('Please enter last name')
    } else if (email.length == 0) {
      toast.warning('Please enter email')
    } else if (mobile.length == 0) {
      toast.warning('Please enter Mobile number')
    } else if (password.length == 0) {
      toast.warning('Please enter password')
    } else if (dob.length == 0) {
      toast.warning('Please enter Date')
    } else if (confirmPassword.length == 0) {
      toast.warning('Please confirm password')
    } else if (password != confirmPassword) {
      toast.warning('Password does not match')
    } else {
      const response = await register(
        firstName,
        lastName,
        email,
        mobile,
        dob,
        password
      )
      if (response['status'] === 'success') {
        toast.success('Successfully registered user')

        // go to the Login page
        navigate('/')
      } else {
        toast.error(response['error'])
      }
    }
  }

  return (
    <div>
      <div className="container">
        <h2 className="page-header">Sign Up</h2>
        <div className="register-container">
          <div className="mb-3">
            <div className="mb-3 side-by-side">
              <div className='mb-1'>
                <label htmlFor="" className='name-on-side mb-2'>First Name</label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className='form-control'
                />
              </div>
              <div className="mb-1">
                <label htmlFor="" className='name-on-side mb-2'>Last Name</label>
                <input
                  className='form-control'
                  onChange={(e) => setLastName(e.target.value)}
                  type="text" />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="" className='name-on-side mb-2'>Email Address</label>
            <input
              className='form-control'
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="" className='name-on-side mb-2'>Mobile Number</label>
            <input
              onChange={(e) => setMobile(e.target.value)}
              className='form-control'
              type="tel"
              maxLength={10} />
          </div>

          <div className="mb-3">
            <label htmlFor="" className='name-on-side mb-2'>Date Of Birth</label>
            <input
              onChange={(e) => setDob(e.target.value)}
              className='form-control'
              type="date" />
          </div>

          <div className="mb-3">
            <label htmlFor="" className='name-on-side mb-2'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='form-control'
              type="password" />
          </div>

          <div className="mb-3">
            <label htmlFor="" className='name-on-side mb-2'>Confirm Password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='form-control'
              type="password" />
          </div>

          <div>
            <button className="btn btn-success button" onClick={onRegister}>Register</button>
          </div>

          <div>
            Already have an Account? <Link to='/'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
