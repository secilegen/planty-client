import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddBookingForm(props) {
  const [description, setDescription] = useState("");
  const [reasonWhy, setReasonWhy] = useState("");
  const [isOnline, setIsOnline] = useState("Online");

  const {user} = useContext(AuthContext)

  const handleSelect = e => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // const { id } = props;

    // const requestBody = { description, reasonWhy, isOnline, id };

    const requestBody = { description, reasonWhy, isOnline, user:user._id };

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
        <textarea
          type="text"
          name="reasonWhy"
          value={reasonWhy}
          onChange={(e) => setReasonWhy(e.target.value)}
        />
        <br/>

        <label>Select location</label>
        <select value={isOnline} onChange={handleSelect}>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        </select>
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookingForm;

