import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Calendar from "react-calendar";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function AddBookingForm(props) {
  const [description, setDescription] = useState("");
  const [reasonWhy, setReasonWhy] = useState("");
  const [isOnline, setIsOnline] = useState("Online");
  const [isConfirmed, setIsConfirmed] = useState("pending");
  const [errorMessageDescription, setErrorMessageDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submit, setSubmit] = useState(false);

  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const expert = props.expert;

  // Handle drop down

  const handleSelectOnline = (e) => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSelectReason = (e) => {
    setReasonWhy(e.target.value);

    console.log("selected", e.target.value);
  };

  useEffect(() => {
    if (submit) {
      if (!description) {
        setErrorMessageDescription("Please add a description to your booking");
      } else {
        setErrorMessageDescription(" ");
      }
    }
  }, [description, submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setIsConfirmed("pending");

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    const requestBody = {
      description,
      reasonWhy,
      isOnline,
      isConfirmed,
      user: user._id,
      expert: expert,
      date,
    };

    if (description) {
      axios
        .post(`${API_URL}/api/get-support`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setDescription("");
          setReasonWhy("");
          setIsOnline("Online");
          setDate("");

          console.log("Booking created:", response.data);

          setIsConfirmed("pending");
          setErrorMessageDescription("")

          setSuccessMessage(
            `You just created your booking - the expert has to accept your booking in the next step`
          );
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        })
        .catch((error) => {
          console.log("error with adding booking", error);
        });
    }
  };

  return (
    <div className="AddBookingForm">
      <h3 className="addSubs">2 Add your booking information</h3>

      <form onSubmit={handleSubmit}>
        <div className="booking-box">
          <div className="booking-label">
            <label>Date</label>
          </div>
          <div className="booking-input">
            <Calendar onChange={(date) => setDate(date)} value={date} />
            {/* <textarea
              type="text"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /> */}
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Description</label>
          </div>
          <div className="booking-input">
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="errorText">{errorMessageDescription}</p>
          </div>
        </div>
        <div className="booking-box">
          <div className="booking-label">
            <label>Reason Why</label>
          </div>
          <div className="booking-input">
            <select value={reasonWhy} onChange={handleSelectReason}>
              <option value="Plant Positioning">Plant Positioning</option>
              <option value="Support with Disease">Support with Disease</option>
              <option value="Plant Concept">Plant Concept</option>
            </select>
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Select location</label>
          </div>
          <div className="booking-input">
            <select value={isOnline} onChange={handleSelectOnline}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
        <p className="successMessage">{successMessage}</p>
        <div className="submit-button">
          <button type="submit" className="small-button button-filled-green">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookingForm;
