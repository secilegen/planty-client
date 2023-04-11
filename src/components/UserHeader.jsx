import React from "react";
import { Link } from "react-router-dom";
import avatar from '../images/human.png'
import editIcon from "../images/editIcon.png"

function UserHeader(props) {
  const numberOfPlants = props.user.myPlants.length;
  const numberOfBookings = props.user.bookings.length;

  return (
    <div className="profile-header">
      <div className="profile-header-top">
        <h1>
          {props.user.firstName} {props.user.lastName}
        </h1>
        <Link to="/profile/edit">
          <img src={editIcon} alt="edit icon" height="25px" />
        </Link>
      </div>
      <div className="profile-header-bottom">
        <div className="profile-header-bottom-image">
        {/* <img src={avatar} alt="avatar"/> */}
          {props.user.image ? <img src={props.user.image} alt="avatar"/> : <img src={avatar} alt="avatar"/>}
        </div>
        <div className="profile-header-bottom-info">
          <p>
            <span>{numberOfPlants}</span> <br /> plants
          </p>
          <p>
            <span>{numberOfBookings}</span> <br /> bookings
          </p>
        </div>
      </div>
    </div>
  );
}


export default UserHeader;
