import React, { useEffect, useState } from 'react';
import './Theatre.css'; // Import the CSS file

const TheatreList = ({ location }) => {
  const [theatres, setTheatres] = useState([]); // State to hold all theatre data
  const [error, setError] = useState(null); // State to hold error messages

  // Fetch theatres from the backend when the component mounts
  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const response = await fetch('https://movie-booking-mh54.onrender.com/theatres'); // Fetch theatres from the backend
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTheatres(data); // Set the fetched theatres to state
      } catch (error) {
        console.error('Error fetching theatres:', error);
        setError('Failed to fetch theatres'); // Set error state if fetch fails
      }
    };

    fetchTheatres();
  }, []); // Only fetch theatres once when the component mounts

  // Normalize casing for location comparison
  const normalizedLocation = (location && location.trim()) ? location.trim().toLowerCase() : ''; 

  // Filter theatres based on the selected location
  const filteredTheatres = theatres.filter(theatre =>
    theatre.location.toLowerCase() === normalizedLocation
  );

  return (
    <div className="theatre-container">
      <h2>Theatres in {location}</h2> 
      <ul>
        {filteredTheatres.length > 0 ? (
          filteredTheatres.map((theatre) => (
            <li key={theatre._id} className="theatre-item">
              <h3>{theatre.name}</h3>
              <p className="theatre-location">Location: {theatre.location}</p>
              <p>Address: {theatre.loc}</p>
              <button className="book-now-button">Book Now</button>
            </li>
          ))
        ) : (
          <p>No theatres available for the selected location.</p>
        )}
      </ul>
    </div>
  );
};

export default TheatreList;
