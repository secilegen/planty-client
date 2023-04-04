import React from 'react'
import { Link } from "react-router-dom";

function UserHeader(props) {
  const numberOfPlants = props.user.myPlants.length
  const numberOfBookings = props.user.bookings.length
  
  return (
    <div>
    <h1>{props.user.firstName} {props.user.lastName}</h1>
    <Link to="/profile/edit">
            <button>Edit Profile</button>
          </Link>
    <img src={props.user.image}/>
    <h3>{numberOfPlants} plants</h3>
    <h3>{numberOfBookings} bookings</h3>  
    
    </div>  
)}

export default UserHeader