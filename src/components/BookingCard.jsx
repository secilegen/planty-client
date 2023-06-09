import React from "react";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png";
import { Link, useNavigate } from "react-router-dom";
import positioning from "../images/Positioning.png";
import support from "../images/Support.png";
import concept from "../images/Concept.png";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BookingCard(props) {
  const { isLoggedIn, user, logOutUser, isExpert } = useContext(AuthContext);
  const navigate = useNavigate();

  const bookingPicture = (reason) => {
    if (reason === "Plant Positioning") {
      return <img src={positioning} alt="booking" className="bookingCardImg" />;
    }
    if (reason === "Support with Disease") {
      return (
        <img src={support} alt="booking" className="bookingCardImg" />
      );
    }
    if (reason === "Plant Concept") {
      return (
        <img src={concept} alt="booking" className="bookingCardImg" />
      );
    }
  };

  const [isConfirmed, setIsConfirmed] = useState("pending");

  const handleClick = (status, bookingId) => {
    const requestBody = { isConfirmed: status };

    axios
      .put(`${API_URL}/api/get-support/${bookingId}`, requestBody)
      .then((response) => {
        navigate(`/get-support/${bookingId}`);
      });
  };

  return (
    <div>
      <div className="bookingCardHeader">
        <h2>My Bookings</h2>
        {!isExpert && 
        <Link to={`/get-support`}>
          <img src={addIcon} alt="add icon" height="30px" />
        </Link>
        }
      </div>

      
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
                      <div className="bookingCardRightTop">
                      <div>
                      <p className="bookingCardReason">
                        {oneBooking.reasonWhy}
                      </p> 

                      </div>
                      <div className="bookingCardIcons">
                      <Link to={`/get-support/${oneBooking._id}`}>
                        <img
                          src={viewDetails}
                          alt="details icon"
                          height="25px"
                        />
                      </Link>

                      <Link to={`/get-support/edit/${oneBooking._id}`}>
                        <img src={editIcon} alt="edit icon" height="25px" />
                      </Link>

                    </div>
                      </div>
                      
                      <p className="bookingCardInfo"><span>Date: </span> {oneBooking.date}</p>
                      <p className="bookingCardInfo"><span>Status: </span>  {oneBooking.isConfirmed}</p>
                      <p className="bookingCardInfo"><span>Location: </span>  {oneBooking.isOnline}</p>

                    </div>

                    {/* <div className="bookingCardLabels">
                      <p className="bookingConfirmedCard">
                        {oneBooking.isConfirmed}
                      </p>
                      <p className="bookingLocationCard">
                        {oneBooking.isOnline}
                      </p>
                    </div> */}

                  

                      {isExpert && oneBooking.isConfirmed === "pending" && (
                        <div className="expertBooking">
                          <button
                          className="expertAccept"
                            onClick={() =>
                              handleClick("accepted", oneBooking._id)
                            }
                          >
                            Accept
                          </button>
                          <button
                           className="expertReject"
                            onClick={() =>
                              handleClick("rejected", oneBooking._id)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                  </div>
                </div>
              </div>
            );
          })}
      
      <div>
        {props?.bookings.length === 0 && <p>You don't have any bookings</p>}</div>
    </div>
  );
}

export default BookingCard;
