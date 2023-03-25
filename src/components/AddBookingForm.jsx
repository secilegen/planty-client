import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddBookingForm(props) {
  const [description, setDescription] = useState("");
  const [reasonWhy, setReasonWhy] = useState("");
  const [isOnline, setIsOnline] = useState("Yes");

  const handleSelect = e => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { description, reasonWhy, isOnline };

    axios
      .post(`${API_URL}/api/get-support`, requestBody)
      .then((response) => {
        // Reset the state
        setDescription("");
        setReasonWhy("");
        setIsOnline("yes")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddBooking">
      <h3>Booking</h3>

      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
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

      
{/* e.target.checked is a boolean value from the `checkbox` input*/}

        <label>Select location</label>
        <select value={isOnline} onChange={handleSelect}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        </select>
       
        
        


        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBookingForm;
