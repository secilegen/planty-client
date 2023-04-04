import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function EditBooking(props) {
    const [description, setDescription] = useState("");
    const [reasonWhy, setReasonWhy] = useState("");
    const [isOnline, setIsOnline] = useState("");
  
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSelect = e => {
    setIsOnline(e.target.value);

    console.log("selected", e.target.value);
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')

    axios
      .get(`${API_URL}/api/get-support/${id}`,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        const oneBooking = response.data;
        setDescription(oneBooking.description);
        setReasonWhy(oneBooking.reasonWhy);
        setIsOnline(oneBooking.isOnline)
      })
      .catch((error) => console.log(error));
    
  }, [id]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { description, reasonWhy, isOnline };

     // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    axios
      .put(`${API_URL}/api/get-support/${id}`, requestBody, 
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/get-support/${id}`)
      });
  };
  
  
  const deleteBooking = () => {
     // Get the token from the localStorage
     const storedToken = localStorage.getItem('authToken'); 
    
    axios
      .delete(`${API_URL}/api/get-support/${id}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        navigate("/"); // navigate to user/id?
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditBooking">
      <h3>Edit Your Booking</h3>

      <form onSubmit={handleFormSubmit}>
        
      

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Reason Why</label>
        <textarea
          type="text"
          name="reasonWhy"
          value={reasonWhy}
          onChange={(e) => setReasonWhy(e.target.value)}
        />

<label>Select location</label>
        <select value={isOnline} onChange={handleSelect}>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        </select>




        <button type="submit">Update Your Booking</button>
      </form>

      <button onClick={deleteBooking}>Delete Your Booking</button>
    </div>
  );
}

export default EditBooking;