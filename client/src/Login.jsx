import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';

const Login = ({ onClose, setUsername, setUserEmail }) => { // Add setUserEmail
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const username = email.split('@')[0]; // Extract username from email
        setUsername(username); // Set the username in App component
        setUserEmail(email); // Set the email in App component
        alert('Login successful!');
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('An error occurred during login.');
    }
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`modal-content ${isClosing ? 'slide-out' : 'slide-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-icon" onClick={handleClose}>&times;</span>
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="sign-up-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
