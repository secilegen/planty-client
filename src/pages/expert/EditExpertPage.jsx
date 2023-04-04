import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function EditExpertPage(props) {
  const [profileImage, setProfileImage] = useState("");
  const [experienceLevel, setExperienceLevel] = useState();
  const [favoritePlants, setFavoritePlants] = useState([]);
  const [availability, setAvailability] = useState("");
  const [availableOnline, setAvailableOnline] = useState("");
  const [expertLocation, setExpertLocation] = useState("");
  const [price, setPrice] = useState();

  const { expertId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get()
      .then((response) => {
        const expertToEdit = response.data;
        setExperienceLevel(expertToEdit.experienceLevel);
        setAvailability(expertToEdit.availability);
        setAvailableOnline(expertToEdit.availableOnline);
        setExpertLocation(expertToEdit.expertLocation);
        setPrice(expertToEdit.price);
      })
      .catch((error) => console.log("Error occured editing expert:", error));
  }, [expertId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      experienceLevel,
      availability,
      availableOnline,
      expertLocation,
      price,
    };

    axios.put(``).then((response) => {
      navigate(``);
    });
  };

  return (
    <div className="EditExpertPage">
      <h3>Edit Your Profile</h3>

      <form onSubmit={handleSubmit}>
        <label>Experience Level</label>
        <select id="" name="experienceLevel" value={experienceLevel} onChange={(e)=> setExperienceLevel(e.target.value)}>
            <option value="1-3 years">1-3 years</option>
            <option value="4-6 years">4-6 years</option>
            <option value="more than 6 years">more than 6 years</option>

        </select>

        <label>Availability</label>
        <select id="" name="availability" value={availability} onChange={(e)=> setAvailability(e.target.value)}>
            <option value="true">I am available for new bookings</option>
            <option value="false">I am NOT available for new bookings</option>
        </select>

        <label>Do you want to offer your services online?</label>
        <select id="" name="availableOnline" value={availableOnline} onChange={(e)=> setAvailableOnline(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>

        <label>Location</label>
        <input
          type="text"
          name="expertLocation"
          value={expertLocation}
          onChange={(e) => setExpertLocation(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>

      {/* <button onClick={deleteProject}>Delete Your Plant</button> */}
    </div>
  );
}

export default EditExpertPage;
