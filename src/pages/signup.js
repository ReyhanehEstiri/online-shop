import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import '../cssfile/signup.css';

function Signup() {
  document.title = 'Online Book Shop - Signup';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword || !email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    
    try {
      const response = await fetch('https://96c6-217-218-145-81.ngrok-free.app/api/v1/Account/Register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      if (response.ok) {
        alert('Signup successful!'); 
        navigate('/login'); 
        const errorData = await response.json();
        if (errorData && errorData.message) {
          setErrorMessage(errorData.message);
        } else {
          setErrorMessage('Error during signup.');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Error during signup. Please try again later.');
    }
  };

  return (
    <div className="signup">
      <div className="box">
        <h1 className="signup-heading">SignUp</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button" onClick={handleSignup}>
          Signup
        </button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
