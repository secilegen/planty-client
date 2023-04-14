// import typeOfDisease from "../disease.json";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import addIcon from "../../images/addIconGreen.png";
import avatar from "../../images/human.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function BookingSelection(props) {
  const [experts, setExperts] = useState([]);

  const getExperts = () => {
    axios
      .get(`${API_URL}/api/expert`)
      .then((response) => {
        console.log("Api response from get all experts is", response.data);
        setExperts(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExperts();
  }, []);

  return (
    <div className="booking-selection">
      <h3 className="addSubs2">1. Select an expert</h3>
      {experts.map((expert) => {
        return (
          <div key={expert._id}>
            <div className="bookingExpert">
              <div className="bookingExpertLeft">
                {expert.profileImage ? (
                  <img
                    src={expert.profileImage}
                    alt="avatar"
                    className="bookingExpertImg"
                  />
                ) : (
                  <img src={avatar} alt="avatar" className="bookingExpertImg" />
                )}
              </div>

              <div className="bookingExpertRight">
                <div className="bookingExpertRow1">
                  <p className="bookingExpertName">
                    {expert.firstName} {expert.lastName}
                  </p>
                  {/* <button onClick={()=>props.selectExpert(expert._id)}>Select</button> */}
                </div>

                <div className="bookingExpertRow2">
                  <p className="bookingLocationCard2">
                    {expert.expertLocation}
                  </p>
                  <p className="bookingLocationCard2">{expert.price} €</p>
                </div>
                <div className="bookingExpertRow3">
                  <p>{expert.experienceLevel} experience</p>
                </div>
              </div>
              <div>
                <img
                  src={addIcon}
                  alt="add icon"
                  height="30px"
                  onClick={() => props.selectExpert(expert._id)}
                  className="addIconBooking"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookingSelection;
