import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Fetch the user data from the server using the token
    fetch(`/api/user/reset?token=${token}`)
      .then(res => res.json())
      .then(data => {
        // Check if the token is invalid or has expired
        if (data.error) {
          // TODO: Render an error message or redirect to an error page
        }
      })
      .catch(err => {
        // TODO: Handle any errors that occur
        console.error(err);
      });
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send password reset request to server
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={token} name="token" />
        <label htmlFor="password">New Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword