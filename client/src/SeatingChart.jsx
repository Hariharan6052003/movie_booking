import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SeatingChart.css'; 

const SeatingChart = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { movie, theatre, time } = location.state || {};

  const generateRandomBookedSeats = (rowCount, seatsPerRow, section, count) => {
    const booked = new Set();
    while (booked.size < count) {
      const row = Math.floor(Math.random() * rowCount) + 1;
      const seat = Math.floor(Math.random() * seatsPerRow) + 1;
      const seatNumber = `${section}-${row}-${seat}`;
      booked.add(seatNumber);
    }
    return Array.from(booked);
  };

  useEffect(() => {
    const randomBookedSeats = [
      ...generateRandomBookedSeats(3, 20, 'front', 5),
      ...generateRandomBookedSeats(7, 20, 'middle', 15),
      ...generateRandomBookedSeats(5, 20, 'back', 10),
    ];
    setBookedSeats(randomBookedSeats);
  }, []);

  const handleSeatClick = (seat, price) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.some((s) => s.seat === seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s.seat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, { seat, price }]);
    }
  };

  const renderSeats = (rowCount, seatsPerRow, price, section) => {
    const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, rowCount);
    return Array.from({ length: rowCount }, (_, rowIndex) => (
      <div key={rowIndex} className="row">
        <div className="row-label">{rowLabels[rowIndex]}</div>
        <div className="row-section">
          {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
            const seatNumber = `${section}-${rowIndex + 1}-${seatIndex + 1}`;
            return (
              <button
                key={seatIndex}
                className={`seat ${section} ${bookedSeats.includes(seatNumber) ? 'booked' : selectedSeats.some((s) => s.seat === seatNumber) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatNumber, price)}
                disabled={bookedSeats.includes(seatNumber)}
                title={`Price: ₹${price}`}
              ></button>
            );
          })}
        </div>
      </div>
    ));
  };

  const renderSeatNumbers = (seatsPerRow) => {
    return (
      <div className="seat-numbers">
        {Array.from({ length: seatsPerRow }, (_, index) => (
          <div key={index} className="seat-number">{index + 1}</div>
        ))}
      </div>
    );
  };

  const getReadableSeatNumbers = () => {
    return selectedSeats
      .map((s) => {
        const [section, row, seat] = s.seat.split('-');
        const rowLabel = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[parseInt(row) - 1];
        return `${rowLabel}${seat}`;
      })
      .join(', ');
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleBookNow = () => {
    const bookingDetails = {
      movie,
      theatre,
      time,
      selectedSeats: getReadableSeatNumbers(),
      totalPrice: getTotalPrice(),
    };
    // Navigate to Orders component with booking details
    navigate('/orders', { state: bookingDetails });
  };

  return (
    <div className="seating-chart-container">
      <div>
        <h1 style={{ color: '#31a4ec' }}>{movie?.title}</h1>
        <img src={movie?.image} alt={movie.title} className="movie-poster" />
        <p style={{ color: '#31a4ec' }}>Theatre: {theatre?.name}</p>
        <p style={{ color: '#31a4ec' }}>Showtime: {time}</p>
      </div>

      <h2>Seating Chart</h2>
      <div className="screen">Screen</div>

      <div className="seating-section front-section">
        <h4>Front Section - Price: ₹60</h4>
        {renderSeats(3, 20, 60, 'front')}
        {renderSeatNumbers(20)}
      </div>

      <div className="seating-section middle-section">
        <h4>Middle Section - Price: ₹130</h4>
        {renderSeats(7, 20, 130, 'middle')}
        {renderSeatNumbers(20)}
      </div>

      <div className="seating-section back-section">
        <h4>Back Section - Price: ₹190</h4>
        {renderSeats(5, 20, 190, 'back')}
        {renderSeatNumbers(20)}
      </div>

      <div className="booking-summary">
        <h3 style={{ color: 'white' }}>Selected Seats: {getReadableSeatNumbers() || 'None'}</h3>
        <h3 style={{ color: 'white' }}>Total Price: ₹{getTotalPrice()}</h3>
        {selectedSeats.length > 0 && (
          <button className="book-now-button" style={{ color: 'white' }} onClick={handleBookNow}>
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SeatingChart;
