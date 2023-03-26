import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditBooking(props) {
    const [description, setDescription] = useState("");
    const [reasonWhy, setReasonWhy] = useState("");
  
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/get-support/${bookingId}`)
      .then((response) => {
        const oneProject = response.data;
        setDescription(oneProject.description);
        setReasonWhy(oneProject.reasonWhy);
      })
      .catch((error) => console.log(error));
    
  }, [bookingId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { description, reasonWhy };

    axios
      .put(`${API_URL}/api/get-support/${bookingId}`, requestBody)
      .then((response) => {
        navigate(`/get-support/${bookingId}`)
      });
  };
  
  
  const deleteProject = () => {
    
    axios
      .delete(`${API_URL}/api/get-support/${bookingId}`)
      .then(() => {
        navigate("/"); // navigate to user/id?
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditBooking">
      <h3>Edit Your Plant</h3>

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


        <button type="submit">Update Your Plant</button>
      </form>

      <button onClick={deleteProject}>Delete Your Plant</button>
    </div>
  );
}

export default EditBooking;