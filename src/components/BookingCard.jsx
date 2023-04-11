import React from "react";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png";
import { Link, useNavigate } from "react-router-dom";
import pictureTest from "../images/banana-plant.png";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BookingCard(props) {
  const { isLoggedIn, user, logOutUser, isExpert } = useContext(AuthContext);
  const navigate = useNavigate();

  const bookingPicture = () => {
    if (props.oneBooking.reasonWhy === "Plant Positioning") {
      return <img src={pictureTest} alt="booking" />;
    }
  };

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
      <h1>My Bookings</h1>

      <Link to={`/get-support`}>
        <img src={addIcon} alt="add icon" height="30px" />
      </Link>

      <div>
        {props?.bookings &&
          props.bookings.map((oneBooking) => {
            return (
              <div key={oneBooking._id}>
                <img src={bookingPicture} alt="booking" />
                <p>Reason: {oneBooking.reasonWhy}</p>
                <p>Description: {oneBooking.description}</p>
                <p>Location: {oneBooking.isOnline}</p>
                <p>Booking status: {oneBooking.isConfirmed}</p>
                <br />

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
            );
          })}
      </div>
    </div>
  );
}

export default BookingCard;
