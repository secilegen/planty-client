
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../../context/auth.context"; 
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import editIcon from "../../images/editIcon.png"
import deleteIcon from "../../images/deleteIcon.png"
import descriptionIcon from "../../images/descriptionIcon.png"
import expertIcon from "../../images/plantExpertIcon.png"
import calendarIcon from "../../images/calendarIconBlack.png"


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function BookingDetails(props) {
    const { isLoggedIn, user, logOutUser, isExpert } = useContext(AuthContext);

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
    <h1 className="detailHeadline">Booking Details</h1>

    {booking && !isExpert && (
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

          <div className='descriptionRow'>
          <img src={calendarIcon} alt="expert" className='descriptionIcon'/>
          <p className='descriptionHead expertAlign'>Date</p>
          <p className='expertAlign2'>{booking.date}</p>
          </div>

          <div className='descriptionRow'>
          <img src={expertIcon} alt="expert" className='descriptionIcon'/>
          
          <p className='descriptionHead expertAlign'>Your Expert: </p>
          <p className='expertAlign2'>{booking.expert.firstName} {booking.expert.lastName}</p>
         
          </div>
          
          <div className='bookingLabels'>
          <p className='bookingLocation'>{booking.isOnline}</p>
          <p className="bookingConfirmed">{booking.isConfirmed}</p>
          </div>
          </div>
          <Link to={`/profile`}>
      <button  className="buttonFramedBooking">Back to profile</button>
      
      </Link>
        </>
        
      )}
    
    {booking && isExpert && (
        <>
      <div className='bookingDetailCard'>
        <div className='bookingDetailHeader'>
        <div className='bookingDetailLeft'>
          <p className='bookingDetailReason'>{booking.reasonWhy}</p>
          </div>
          
      </div>
          
          <div className='descriptionRow'>
          <img src={descriptionIcon} alt="description" className='descriptionIcon'/>
          <p className='descriptionHead'>Description</p>
          </div>
          <div>
          <p className='bookingText'>{booking.description}</p>

          </div>

          <div className='descriptionRow'>
          <img src={calendarIcon} alt="expert" className='descriptionIcon'/>
          <p className='descriptionHead expertAlign'>Date</p>
          <p className='expertAlign2'>{booking.date}</p>
          </div>

          <div className='descriptionRow'>
          <img src={expertIcon} alt="user" className='descriptionIcon'/>
          
          <p className='descriptionHead expertAlign'>Booked by: </p>
          <p className='expertAlign2'>{booking.user.firstName} {booking.user.lastName}</p>
         
          </div>
          
          <div className='bookingLabels'>
          <p className='bookingLocation'>{booking.isOnline}</p>
          <p className="bookingConfirmed">{booking.isConfirmed}</p>
          </div>
          </div>
          <Link to={`/expert/profile`}>
      <button  className="buttonFramedBooking">Back to profile</button>
      
      </Link>
        </>
      )}
    
      
      </div>
  )
}

export default BookingDetails