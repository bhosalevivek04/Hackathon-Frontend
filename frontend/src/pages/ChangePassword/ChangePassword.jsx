import React, { useState } from 'react';
import { changePassword } from '../../services/user';
import './ChangePassword.css';
import { toast } from 'react-toastify';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    const response = await changePassword(oldPassword, newPassword);
    if (response.status === 'success') {
      toast.success('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error(response.error || 'Failed to change password');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <div className="form-group">
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword} className="btn btn-primary mt-2">
        Change Password
      </button>
    </div>
  );
}

export default ChangePassword;
