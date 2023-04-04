
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function BookingDetails(props) {
    const [booking, setBooking] = useState(null)
    const { id } = useParams();

    const getBooking = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');
    
        // Send the token through the request "Authorization" Headers
        axios
          .get(
            `${API_URL}/api/get-support/${id}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((response) => {
            const oneBooking = response.data;
            setBooking(oneBooking);
          })
          .catch((error) => console.log(error));
      };

      useEffect(()=> {
        getBooking()
      }, [] );

  return (
    <div className="BookingDetails">
    <h1>Booking Details</h1>

    {booking && (
        <>
          <h1>{booking.description}</h1>
          <p>{booking.reasonWhy}</p>
          <p>{booking.isOnline}</p>
        </>
      )}

    <Link to={`/get-support/edit/${id}`}>
        <button>Edit Booking</button>
      </Link>
      </div>
  )
}

export default BookingDetails