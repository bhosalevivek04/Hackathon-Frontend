import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/user';
import './EditProfile.css';
import { toast } from 'react-toastify';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const response = await getProfile();
      if (response.status === 'success') {
        const user = response.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setMobile(user.mobile);
        setDob(user.dob);
      } else {
        toast.error('Failed to load profile');
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName || !email || !mobile || !dob) {
      toast.error('All fields are required');
      return;
    }

    const response = await updateProfile(firstName, lastName, email, mobile, dob);
    if (response.status === 'success') {
      toast.success('Profile updated successfully');
    } else {
      toast.error(response.error || 'Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          id="mobile"
          className="form-control"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          className="form-control"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateProfile} className="btn btn-primary mt-2">
        Update Profile
      </button>
    </div>
  );
}

export default EditProfile;
