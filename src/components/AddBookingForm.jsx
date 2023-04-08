import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function AddBookingForm(props) {
  const [description, setDescription] = useState("");
  const [reasonWhy, setReasonWhy] = useState("");
  const [isOnline, setIsOnline] = useState("Online");
  const [isConfirmed, setIsConfirmed] = useState("pending")

  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const expert = props.expert
  
  // Handle drop down
  
  const handleSelectOnline = e => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSelectReason = e => {
    setReasonWhy(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmed("pending")


    // const { id } = props;

    // const requestBody = { description, reasonWhy, isOnline, id };


    const requestBody = { description, reasonWhy, isOnline, isConfirmed, user:user._id, expert:expert };


    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers

   axios
      .post(`${API_URL}/api/get-support`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state
        setDescription("");
        setReasonWhy("");
        setIsOnline("Online")

        console.log('Booking created:', response.data)

        setIsConfirmed("pending")


        navigate("/profile")

        // props.refreshUser();  refresh user page with new booking?
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddBooking">
      <h3>Booking</h3>

      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br/>

        <label>Reason Why</label>
        <select value={reasonWhy} onChange={handleSelectReason}>
        <option value="Plant Positioning">Plant Positioning</option>
        <option value="Support with Disease">Support with Disease</option>
        <option value="Plant Concept">Plant Concept</option>
        </select>

        <br/>

        <label>Select location</label>
        <select value={isOnline} onChange={handleSelectOnline}>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        </select>
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookingForm;

