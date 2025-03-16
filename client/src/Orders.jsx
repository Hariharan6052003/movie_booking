// Orders.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './Orders.css';

const Orders = ({ email }) => {
  const location = useLocation();
  const { movie, theatre, time, selectedSeats, totalPrice } = location.state || {};
  const [showTicket, setShowTicket] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const toggleTicketPopup = () => {
    setShowTicket(!showTicket);
  };

  const togglePaymentPopup = () => {
    setShowPaymentPopup(!showPaymentPopup);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          movie, 
          theatre, 
          time, 
          selectedSeats, 
          totalPrice,
          email 
        }),
      });

      if (response.ok) {
        alert("Payment Successful! Order saved.");
        setPaymentSuccess(true);
        setShowPaymentPopup(false);
      } else {
        alert("Payment Successful, but failed to save order.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Payment successful, but an error occurred while saving order.");
    }
  };

  // Check if required values are null and display a message if so
  if (!movie || !theatre || !time || !selectedSeats || totalPrice == null) {
    return <div className="orders-container1"><p5>Kindly place your order</p5></div>;
  }

  return (
    <div className="orders-container">
      <div className="order-strip">
        <img src={movie?.image} alt={movie?.title} className="order-movie-image" />
        <div className="order-details">
          <h2>{movie?.title}</h2>
          <p><strong>Theatre:</strong> {theatre?.name}</p>
          <p><strong>Showtime:</strong> {time}</p>
          <p><strong>Seats:</strong> {selectedSeats}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          <p><strong>Logged-in Email:</strong> {email}</p>
        </div>
      </div>

      {!paymentSuccess && (
        <button 
          className="payment-button" 
          onClick={togglePaymentPopup}
        >
          Make Payment
        </button>
      )}

{showPaymentPopup && (
  <div className="payment-popup">
    <div className="payment-popup-content">
      <img src="https://tse1.mm.bing.net/th?id=OIP.L9jO8h98ub3lfzQ5zdbUFAHaCW&pid=Api&P=0&h=180" alt="Paytm Logo" className="paytm-logo" />
      <h3>Secure Payment</h3>
      <p className="payment-amount"><strong>Amount:</strong> ₹{totalPrice}</p>
      <p><strong>Email:</strong> hariharan605203@gmail.com</p>
      <p><strong>Phone:</strong> 9363374380</p>

      <div className="upi-options">
      <p>
    <strong>UPI Option:</strong> BHIM UPI
    <img src="https://tse1.mm.bing.net/th?id=OIP.BXvkWY5zCZ0sRztkL9tUdwHaCn&pid=Api&P=0&h=180" alt="UPI Logo" className="upi-logo" />
  </p>
        <QRCode 
          value={`upi://pay?pa=hariharan605203@upi&pn=Hariharan&am=${totalPrice}&cu=INR`} 
          size={120} 
        />
        <p className="qr-instructions">Scan QR Code to Pay</p>
      </div>

      <button className="pay-button" onClick={handlePayment}>Pay</button>
      <br/>
      <button className="close-payment-button" onClick={togglePaymentPopup}>Cancel</button>
    </div>
  </div>
)}


      {paymentSuccess && (
        <button
          className="view-ticket-button"
          onClick={toggleTicketPopup}
        >
          View Ticket
        </button>
      )}

      {showTicket && paymentSuccess && (
        <div className="ticket-popup">
          <div className="ticket-container">
            <h2 className="ticket-title">{movie?.title}</h2>
            <br />
            <img src={movie?.image} alt={movie?.title} className="ticket-movie-image" />
            <br />
            <p1><strong>Theatre:</strong> {theatre?.name}</p1>
            <br />
            <p1><strong>Showtime:</strong> {time}</p1>
            <br />
            <p1><strong>Seats:</strong> {selectedSeats}</p1>
            <br />
            <p1><strong>Total Price:</strong> ₹{totalPrice}</p1>
            <br />
            <div className="ticket-qr-code">
              <QRCode 
                value={`Movie: ${movie?.title}, Seats: ${selectedSeats}, Price: ₹${totalPrice}`} 
                size={120} 
              />
            </div>
            <p className="enjoy-message"> Scan And Verify</p>
            <p className="enjoy-message">Enjoy With Your Family And Friends!</p>
            <button className="close-ticket-button" onClick={toggleTicketPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
