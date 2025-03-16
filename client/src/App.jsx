import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Home from './Home';
import Container from './Container';
import Orders from './Orders';
import History from './History';
import SeatingChart from './SeatingChart';
import TheatreList from './TheatreList';
import SignUp from './SignUp';
import Login from './Login';

import './App.css';

function App() {
  const [location, setLocation] = useState('CHENNAI');
  const [isModalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState(''); // State to store the email
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLoginOpen = () => {
    setShowLogin(true);
    setModalOpen(false);
  };

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setUsername('');
    setUserEmail(''); // Clear the email on logout
    setShowDropdown(false);
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <div className="navbar-left">
            <Link to="/home">Home</Link>
            <Link to="/theatre-list">Theatre</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/history">History</Link>
          </div>
          <div className="navbar-right">
            <span>Location: </span>
            <select value={location} onChange={handleLocationChange} className="location-dropdown">
              <option value="PONDICHERRY">Pondicherry</option>
              <option value="CHENNAI">Chennai</option>
              <option value="AMBUR">Ambur</option>
              <option value="CUDDALORE">Cuddalore</option>
              <option value="KANNIYAKUMARI">Kanniyakumari</option>
            </select>
            {username ? (
              <div className="user-greeting" onClick={handleUserIconClick} style={{ position: 'relative' }}>
                <FaUser style={{ marginRight: '5px' }} /> {username}
                {showDropdown && (
                  <div className="dropdown-menu" style={{
                    color:'black',
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                  onClick={handleLogout}>
                    Logout
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="sign-in" onClick={toggleModal}>Sign In</button>
                <button className="sign-in2" onClick={handleLoginOpen}>Login</button>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home location={location} />} />
          <Route path="/seating-chart" element={<SeatingChart />} />
          <Route path="/movies" element={<Container />} />
          <Route path="/theatre-list" element={<TheatreList location={location} />} />
          <Route path="/orders" element={<Orders email={userEmail} />} /> {/* Pass email to Orders */}
          <Route path="/history" element={<History email={userEmail}/>} />
          <Route path="/login" element={<Login onClose={() => setShowLogin(false)} setUsername={setUsername} setUserEmail={setUserEmail} />} />
        </Routes>

        {isModalOpen && <SignUp onClose={toggleModal} />}
        {showLogin && <Login onClose={() => setShowLogin(false)} setUsername={setUsername} setUserEmail={setUserEmail} />} {/* Pass setUserEmail */}
      </div>
    </Router>
  );
}

export default App;
