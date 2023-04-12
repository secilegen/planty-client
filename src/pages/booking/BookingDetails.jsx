
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import editIcon from "../../images/editIcon.png"
import deleteIcon from "../../images/deleteIcon.png"
import descriptionIcon from "../../images/descriptionIcon.png"


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function BookingDetails(props) {
    const [booking, setBooking] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();

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

      const deleteBooking = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');      
       
        // Send the token through the request "Authorization" Headers 
       
       axios
         .delete(`${API_URL}/api/get-support/${id}`,
         { headers: { Authorization: `Bearer ${storedToken}` } } 
         )
         .then((response) => {
            console.log(response.data)
    
           navigate(`/profile`); 
         })
         .catch((err) => console.log(err));
     };  

  return (
    <div className="BookingDetails">
    <h2 className="detailHeadline">Booking Details</h2>

    {booking && (
        <>
      <div className='bookingDetailCard'>
        <div className='bookingDetailHeader'>
        <div className='bookingDetailLeft'>
          <p className='bookingDetailReason'>{booking.reasonWhy}</p>
          </div>

          <div className='bookingDetailRight'> 
          <Link to={`/get-support/edit/${id}`}>
        <img src={editIcon} alt='"edit' className="bookingDetailsEdit"/>
      </Link>

      <Link to={`/get-support/edit/${id}`}>
      <img src={deleteIcon} alt="delete" onClick={deleteBooking} className="bookingDetailsDelete"/>
        {/* <button onClick={deleteBooking}>Delete Booking</button> */}
      </Link>
</div>
      </div>
          
          <div className='descriptionRow'>
          <img src={descriptionIcon} alt="description" className='descriptionIcon'/>
          <p className='descriptionHead'>Description</p>
          </div>
          <div>
          <p className='bookingText'>{booking.description}</p>
          </div>
          <p className='descriptionHead'>Date</p>
          <p className='bookingText'>{booking.date}</p>

          <div className='bookingLabels'>
          <p className='bookingLocation'>{booking.isOnline}</p>
          <p className="bookingConfirmed">{booking.isConfirmed}</p>
          </div>
          </div>
        </>
      )}
      <Link to={`/profile`}>
      <button  className="buttonFramedBooking">Profile</button>
      
      </Link>
      </div>
  )
}

export default BookingDetails