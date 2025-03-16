import React, { useEffect, useState } from 'react';
import './History.css'
const History = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Fetching orders for email:", email); // Log the email
      setLoading(true); // Start loading

      try {
        const response = await fetch(`http://localhost:5000/orders/${email}`);
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Fetched orders:", data); // Log the fetched orders
        setOrders(data); // Store fetched orders in state
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message); // Set the error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (email) {
      fetchOrders(); // Call the function to fetch orders only if email is provided
    }
  }, [email]);

  if (loading) {
    return <p style={{ marginTop: '50px', fontSize: '30px', textAlign: 'center' }} ><b>Login For Ticket History</b></p>; // Show a loading message
  }

  return (
    <div className="history-container">
      <h2>Order History</h2>
      {error ? ( // Check if there was an error
        <p>Error fetching orders: {error}</p>
      ) : orders.length > 0 ? ( // Check if there are orders
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <img src={order.movie.image} alt={order.movie.title} />
              <h3>{order.movie.title}</h3>
              <p>Theatre: {order.theatre.name}</p>
              <p>Time: {order.time}</p>
              <p>Seats: {order.selectedSeats.join(', ')}</p>
              <p>Total Price: ₹{order.totalPrice.toFixed(2)}</p>
              <img className="seal" src="https://cdn.pixabay.com/photo/2020/04/10/13/23/paid-5025785_960_720.png" alt="Paid Seal" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default History;
