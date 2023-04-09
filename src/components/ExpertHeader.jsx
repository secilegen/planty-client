import React from "react";
import { Link } from "react-router-dom";
import avatar from '../images/human.png'


function ExpertHeader(props) {
  let ratingSum;
  for (let i = 0; i < props.expert.booking.length; i++) {
    ratingSum = ratingSum + props.expert.booking[i].rating;
  }
  const avgRating = ratingSum / props.expert.booking.length;
  const numberOfBookings = props.expert.booking.length;
  console.log("Expert from props is", props.expert);
  return (
    <div className="profile-header">
      <div className="profile-header-top">
        <h1>
          {props.expert.firstName} {props.expert.lastName}
        </h1>
        <Link to="./edit">
          <button>Edit Profile</button>
        </Link>
      </div>
      <div className="profile-header-bottom">
        <div className="profile-header-bottom-image">
         ({props.expert.image} ? <img src={props.expert.image} alt="avatar"/> : <img src={avatar} alt="avatar"/>)
        </div>
        <div className="profile-header-bottom-image">
          <p>
            <span>{avgRating}</span> rating
          </p>
          <p>
            <span>{numberOfBookings}</span> bookings
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExpertHeader;
