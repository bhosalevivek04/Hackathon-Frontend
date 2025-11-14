import React, { useState } from 'react'
import { update } from '../../services/user';
import { toast } from 'react-toastify';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');

  const onUpdate = async () => {
    if (firstName.length == 0) {
      toast.warning('Please enter first name')
    } else if (lastName.length == 0) {
      toast.warning('Please enter last name')
    } else if (email.length == 0) {
      toast.warning('Please enter email')
    } else if (mobile.length == 0) {
      toast.warning('Please enter Mobile number')
    } else if (dob.length == 0) {
      toast.warning('Please enter Date')
    } else {
      const response = await update(
        firstName,
        lastName,
        email,
        mobile,
        dob
      )
      if (response['status'] === 'success') {
        toast.success('Successfully Updated user')

        navigate('/allMovies')
      } else {
        toast.error(response['error'])
      }
    }
  }


  return (
    <div>
      {/* <h2>Edit Profile</h2> */}
      <div className="container">
        <h2 className="page-header">Edit Profile</h2>
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

          <div>
            <button className="btn btn-success button" onClick={onUpdate}>Update Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
