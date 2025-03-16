import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';

const SignUp = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Delay to match animation duration
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://movie-booking-mh54.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert('Sign up successful!');
        handleClose();
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`modal-content ${isClosing ? 'slide-out' : 'slide-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-icon" onClick={handleClose}>&times;</span>
        <h2 className="modal-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="input-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>
        
      </div>
    </div>
  );
};

export default SignUp;
