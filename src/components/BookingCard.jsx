import React from "react";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png";
import { Link, useNavigate } from "react-router-dom";
import pictureTest from "../images/cactus-vertical.png";
import pictureTest2 from "../images/banana-plant.png";
import pictureTest3 from "../images/leaves.png";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";



function BookingCard(props) {

  const { isLoggedIn, user, logOutUser, isExpert } = useContext(AuthContext);
  const navigate = useNavigate();

 

const bookingPicture = (reason) => {
    if (reason === "Plant Positioning") {
      return <img src={pictureTest} alt="booking" className="bookingCardImg"/>;
    } 
    if (reason === "Support with Disease") {
      return <img src={pictureTest2} alt="booking" className="bookingCardImg"/>;
    } 
    if (reason === "Plant Concept") {
      return <img src={pictureTest3} alt="booking" className="bookingCardImg"/>;
  };
}

  const [isConfirmed, setIsConfirmed] = useState("pending");

  const handleClick = (status, bookingId) =>{
    
    const requestBody = {isConfirmed:status}

    axios.put(`${API_URL}/api/get-support/${bookingId}`, requestBody)
    .then((response) => {
      navigate(`/get-support/${bookingId}`);
    });
  }

  

 
  return (
    <div>
      <div className="diseaseHeader">
        <h2>My Bookings</h2>

        <Link to={`/get-support`}>
          <img src={addIcon} alt="add icon" height="30px" />
        </Link>
      </div>

      <div>
        {props?.bookings &&
        props.bookings.map((oneBooking) => {
          return (
            <div key={oneBooking._id}>
              <div className="bookingCard">
                <div className="bookingCardLeft">
                  {bookingPicture(oneBooking.reasonWhy)}
                  
                </div>

                
                <div className="bookingCardRight">

                <div className="bookingCardRight1">
                  <p className="bookingCardReason">{oneBooking.reasonWhy}</p>
                </div>

                <div>
                <p>{oneBooking.date}</p>
                </div>

                  <div className="bookingCardLabels">
                    <p className="bookingConfirmedCard">{oneBooking.isConfirmed}</p>
                    <p className="bookingLocationCard">{oneBooking.isOnline}</p>
                    
                  </div>

                  <div className="bookingCardIcons">
                    <Link to={`/get-support/${oneBooking._id}`}>
                      <img src={viewDetails} alt="details icon" height="25px" />
                    </Link>

                    <Link to={`/get-support/edit/${oneBooking._id}`}>
                      <img src={editIcon} alt="edit icon" height="25px" />
                    </Link>

                    {isExpert && ( oneBooking.isConfirmed === "pending" && (
                  <div>
                    <button onClick={() => handleClick("accepted",oneBooking._id)}>
                      Accept
                    </button>
                    <button onClick={() => handleClick("rejected", oneBooking._id) }>
                      Reject
                    </button>
                  </div>
          ))}
                  </div>
                </div>
              </div>
              </div>
          );
          
        })}

      
    </div>
    </div>
    
  )
}

export default BookingCard;
