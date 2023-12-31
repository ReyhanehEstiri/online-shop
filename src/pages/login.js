import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../cssfile/login.css';
import Cookies from 'js-cookie';


function Login() {
  document.title = 'Online Book Shop';
  const [username, setUsername] = useState('');
  const [userToken, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const HandleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill in all fields.');
    }
    
    const response = await fetch("https://localhost:7268/api/v1/Account/LogIn", {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        'ngrok-skip-browser-warning':true,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      alert('Username or password is wrong!');
      // const navigate = useNavigate(); // Don't use useNavigate here
      // navigate('/profile');
    } else {
      const data = await response.json();

        localStorage.setItem("user_id", data.token);

        navigate("/profile");
    }
  };

  const handleForgotPassword = () => {
    // Implement logic for password recovery here
    // This can involve sending a password reset email or redirecting to a password recovery page
    alert('Forgot Password clicked');
  };

  const handleSignupClick = () => {
    // Navigate to the signup page when the "Signup" button is clicked
    navigate('/signup');
  };

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="welcome-heading">Welcome</h1>
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
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <button type="submit" className="login-button" onClick={HandleLogin}>
          Login
        </button>
        <button type="button" className="signup-button" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Login;
