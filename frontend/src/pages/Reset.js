import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      // Check token with backend
      if (token) {
        const response = await fetch('https://guitar-paths-api.onrender.com/api/user/reset', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
      })
  const json = await response.json()
        if (!response.ok) {
            console.log("response is not ok: " + json.error)
        }
        if (response.ok) {
            const text = JSON.stringify(json)
            console.log("got things back: " + text)
        }
      }
    }
  checkToken()
  },[])
    

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send password reset request to server
    console.log(token)
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input type="hidden" value={token} name="token" />
        <label htmlFor="password">New Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
        <p>{token}</p>
      </form>
    </div>
  );
}

export default ResetPassword