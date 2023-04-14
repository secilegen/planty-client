import React from "react";
import { Link } from "react-router-dom";
import avatar from '../images/human.png'
import editIcon from "../images/editIcon.png"



function ExpertHeader(props) {
  const numberOfBookings = props.expert.bookings.length;
  let ratingSum;
  // for (let i = 0; i < props.expert.bookings.length; i++) {
  //   ratingSum += +props.expert.bookings[i].rating;
  // }
  const avgRating = ratingSum / props.expert.bookings.length;
  ratingSum = props.expert.bookings[1].rating + props.expert.bookings[2].rating
  console.log("Expert from props is", props.expert);
  console.log("Experts bookings are", props.expert.bookings)
  console.log(props.expert.bookings.length)
  console.log(ratingSum)
  return (
    <div className="profile-header">
      <div className="profile-header-top">
        <h1>
          {props.expert.firstName} {props.expert.lastName}
        </h1>
        <Link to="./edit">
        <img src={editIcon} alt="edit icon" height="25px" />
        </Link>
      </div>
      <div className="profile-header-bottom">
        <div className="profile-header-bottom-image">
         {props.expert.profileImage ? <img src={props.expert.profileeImage} alt="avatar"/> : <img src={avatar} alt="avatar"/>}
        </div>
        <div className="profile-header-bottom-info">
        {/* <p>
            <span>{avgRating}</span><br />  rating
          </p> */}
          <p>
            <span>5</span><br />  rating
          </p>
          <p>
            <span>{numberOfBookings}</span><br />  bookings
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExpertHeader;
