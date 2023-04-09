import React from 'react'
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png"
import { Link } from "react-router-dom";
import pictureTest from "../images/banana-plant.png"

function BookingCard(props) {

  const bookingPicture = () => {
    if (props.oneBooking.reasonWhy === "Plant Positioning") {
      return (
      <img src={pictureTest} alt="booking"/>
      )
    }
  }

  return (
    <div>
    <h1>My Bookings</h1>

    <Link to={`/get-support`}>
        <img src={addIcon} alt="add icon" height="30px" />
      </Link>

    <div>{props.bookings.map(oneBooking => {
        return (
            <div key={oneBooking._id}>
  
         

            <img src={bookingPicture} alt="booking"/>
            <p>Reason: {oneBooking.reasonWhy}</p>
            <p>Description: {oneBooking.description}</p>
            <p>Location: {oneBooking.isOnline}</p>
            <p>Booking status: {oneBooking.isConfirmed}</p>
            <br/>

            <Link to={`/get-support/${oneBooking._id}`}>
                <img src={viewDetails} alt="details icon" height="25px" />
              </Link>

              <Link to={`/get-support/edit/${oneBooking._id}`}>
                <img src={editIcon} alt="edit icon" height="25px" />
              </Link>

            </div>
            )
            
    })}

        </div>
    
    </div>
  )
}

export default BookingCard