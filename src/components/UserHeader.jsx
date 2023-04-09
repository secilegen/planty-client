import React from 'react'
import { Link } from "react-router-dom";
import editIcon from "../images/editIcon.png"

function UserHeader(props) {
  const numberOfPlants = props.user.myPlants.length
  const numberOfBookings = props.user.bookings.length
  
  return (
    <div>
    <h1>{props.user.firstName} {props.user.lastName}</h1>
    <Link to="/profile/edit">
    <img src={editIcon} alt="edit icon" height="25px" />
          </Link>
    <img src={props.user.image} alt="profile" style={{width: "300px"}}/>
    <h3>{numberOfPlants} plants</h3>
    <h3>{numberOfBookings} bookings</h3>  
    
    </div>  
)}

export default UserHeader