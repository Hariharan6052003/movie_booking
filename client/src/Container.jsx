import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Container.css';

const Container = ({ movies, searchTerm, selectedGenre, selectedLanguage, selectedRating, location }) => {
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [theatres, setTheatres] = useState([]); 
  const navigate = useNavigate(); 

  
  const fetchTheatreDetails = async () => {
    try {
      const response = await fetch('/theatres');
      const data = await response.json(); 
      console.log('Fetched Theatres:', data); 
      setTheatres(data); 
    } catch (error) {
      console.error('Error fetching theatre details:', error);
    }
  };

  useEffect(() => {
    fetchTheatreDetails(); 
  }, []);

  
  const normalizedLocation = (location || '').trim().toLowerCase();
  console.log('Normalized Location:', normalizedLocation); 

  
  const filteredTheatres = theatres.filter(theatre => {
    const normalizedTheatreLocation = theatre.location.toLowerCase(); 
    console.log('Theatre Location:', normalizedTheatreLocation); 
    return normalizedTheatreLocation === normalizedLocation;
  });

  
  console.log('Available Theatre Locations:', theatres.map(theatre => theatre.location));

  const filteredMovies = movies.filter((movie) => {
    const isTitleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isGenreMatch = selectedGenre ? movie.Genres.split(',').map(genre => genre.trim()).includes(selectedGenre) : true;
    const languages = movie.lang.split(',').map(lang => lang.trim());
    const isLanguageMatch = selectedLanguage ? languages.includes(selectedLanguage) : true;
    const ratingThreshold = selectedRating ? parseInt(selectedRating) : null;
    const isRatingMatch = ratingThreshold !== null ? movie.review === ratingThreshold : true;

    return isTitleMatch && isGenreMatch && isLanguageMatch && isRatingMatch;
  });

  const handleBookNowClick = (movie) => {
    setSelectedMovie(movie); 
  };

  const handleTimingClick = (theatre, time ) => {
    
    navigate('/seating-chart', { state: { movie: selectedMovie, theatre, time } });
  };

 
  if (selectedMovie) {
    return (
      <div className="movie-details">
        <img src={selectedMovie.image} alt={selectedMovie.title} className="img" />
        <h3>{selectedMovie.title}</h3>
        <h4>Rating: {selectedMovie.rating} &#x2022; Language: {selectedMovie.lang}</h4>
        <h4>Genre: {selectedMovie.Genres}</h4>
    
        <h2>Theatres in {location}</h2> 
        <div className="theatre-container">
          <ul>
            {filteredTheatres.length > 0 ? (
              filteredTheatres.map((theatre) => (
                <li key={theatre._id} className="theatre-item">
                  <h3>{theatre.name}</h3>
                  <p className="theatre-location">Location: {theatre.location}</p>
                  <p>Address: {theatre.loc}</p>
                  
                  
                  <div className="timings">
                    {theatre.showtimes.length > 0 ? (
                      theatre.showtimes.map((time, index) => (
                        <button key={index} className="timing-button" onClick={() => handleTimingClick(theatre, time)}>
                          {time}
                        </button>
                      ))
                    ) : (
                      <p>No showtimes available.</p>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p>No theatres available for the selected location.</p>
            )}
          </ul>
        </div>
    
        <button className="back-button" onClick={() => setSelectedMovie(null)}>Back to Movies</button>
      </div>
    );
  }

  return (
    <div className="movie-panel-container">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie, index) => (
          <div key={index} className="movie-panel">
            <img src={movie.image} alt={movie.title} className="movie-image" />
            <h3>{movie.title}</h3>
            <h4>{movie.rating} &#x2022; {movie.lang}</h4>
            <button className="book-now-button" onClick={() => handleBookNowClick(movie)}>Book Now</button>
          </div>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default Container;
