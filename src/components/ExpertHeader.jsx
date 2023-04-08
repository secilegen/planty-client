import React from 'react'
import { Link } from "react-router-dom";


function ExpertHeader(props) {
    let ratingSum
    for (let i = 0; i < props.expert.booking.length; i++) {
        ratingSum = ratingSum + props.expert.booking[i].rating
    }
    const avgRating = ratingSum/props.expert.booking.length
    const numberOfBookings = props.expert.booking.length
    console.log('Expert from props is', props.expert)
    return (
      <div>
      <h1>{props.expert.firstName} {props.expert.lastName}</h1>
      <Link to="./edit">
              <button>Edit Profile</button>
            </Link>
      <img src={props.expert.image}/>
      <h3>{avgRating} rating</h3>
      <h3>{numberOfBookings} bookings</h3>  
      
      </div>  
  )
}

export default ExpertHeader