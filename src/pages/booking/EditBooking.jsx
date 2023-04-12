import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditBooking(props) {
  const [description, setDescription] = useState("");
  const [reasonWhy, setReasonWhy] = useState("");
  const [isOnline, setIsOnline] = useState("");
  const [date, setDate] = useState(new Date());
  const [errorMessageDescription, setErrorMessageDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submit, setSubmit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSelectReason = (e) => {
    setReasonWhy(e.target.value);

    console.log("selected", e.target.value);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/get-support/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneBooking = response.data;
        setDescription(oneBooking.description);
        setReasonWhy(oneBooking.reasonWhy);
        setIsOnline(oneBooking.isOnline);
        setDate(oneBooking.date);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (submit) {
      if (!description) {
        setErrorMessageDescription("Please add a description to your booking");
      } else {
        setErrorMessageDescription("");
      }
    }
  }, [description, submit]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const requestBody = { description, reasonWhy, isOnline, date };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    if (description) {
      axios
        .put(`${API_URL}/api/get-support/${id}`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setSuccessMessage(
            `You just updated your booking - have a great appointment with your expert`
          );
          setTimeout(() => {
            navigate(`/get-support/${id}`);
          }, 3000);
        })
        .catch((error) => {
          console.log("error with edit booking", error);
        });
    }
  };

  const deleteBooking = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/get-support/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditBooking">
      <h1 className="detailHeadline">Edit Your Booking</h1>

      <form onSubmit={handleFormSubmit}>
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
            <select
              value={reasonWhy}
              onChange={(e) => setReasonWhy(e.target.value)}
            >
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
            <select value={isOnline} onChange={handleSelect}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
        <br />
        <br />
        <p className="successMessage">{successMessage}</p>

        <div className="submit-button">
          <button type="submit" className="small-button button-filled-green">
            Confirm changes
          </button>
        </div>
      </form>
      <br />
      <button onClick={deleteBooking} className="small-button">
        Delete booking
      </button>
    </div>
  );
}

export default EditBooking;
