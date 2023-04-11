import React from "react";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png";
import { Link } from "react-router-dom";
import pictureTest from "../images/testBooking.png";

function BookingCard(props) {
  
  const bookingPicture = () => {
    if (props.oneBooking.reasonWhy === "Plant Positioning") {
      return <img src={pictureTest} alt="booking" />;
    }
  };

  return (
    <div>
      <div className="diseaseHeader">
        <h2>My Bookings</h2>

        <Link to={`/get-support`}>
          <img src={addIcon} alt="add icon" height="30px" />
        </Link>
      </div>

      <div>
        {props.bookings.map((oneBooking) => {
          return (
            <div key={oneBooking._id}>
              <div className="bookingCard">
                <div className="bookingCardLeft">
                  <img src={pictureTest} alt="booking" className="bookingCardImg"/>
                </div>

                
                <div className="bookingCardRight">

                <div className="bookingCardRight1">
                  <p className="bookingCardReason">{oneBooking.reasonWhy}</p>
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
                  </div>
                  </div>
                </div>
              </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default BookingCard;
