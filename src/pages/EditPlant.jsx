import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditPlant(props) {
    const [nickname, setNickname] = useState("");
    const [sunlight, setSunlight] = useState("");
    const [plantImage, setPlantImage] = useState("");
    const [plantHeight, setPlantHeight] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [currentCondition, setCurrentCondition] = useState("");
  
  const { plantId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants/${plantId}`)
      .then((response) => {
        const oneProject = response.data;
        setNickname(oneProject.nickname);
        setSunlight(oneProject.sunlight);
        setPlantImage(oneProject.plantImage);
        setPlantHeight(oneProject.plantHeight);
        setBirthDate(oneProject.birthDate);
        setCurrentCondition(oneProject.currentCondition);
      })
      .catch((error) => console.log(error));
    
  }, [plantId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { nickname, sunlight, plantImage, plantHeight, birthDate, currentCondition };

    axios
      .put(`${API_URL}/api/plants/${plantId}`, requestBody)
      .then((response) => {
        navigate(`/projects/${plantId}`)
      });
  };
  
  
  const deleteProject = () => {
    
    axios
      .delete(`${API_URL}/api/plants/${plantId}`)
      .then(() => {
        navigate("/"); // navigate to user/id?
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit Your Plant</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label>Sunlight Positioning</label>
        <textarea
          type="text"
          name="sunlight"
          value={sunlight}
          onChange={(e) => setSunlight(e.target.value)}
        />

<label>Plant Image</label>
        <textarea
          type="text"
          name="plantImage"
          value={plantImage}
          onChange={(e) => setPlantImage(e.target.value)}
        />

<label>Plant Height</label>
        <textarea
          type="text"
          name="plantHeight"
          value={plantHeight}
          onChange={(e) => setPlantHeight(e.target.value)}
        />

<label>Birth Date</label>
        <textarea
          type="text"
          name="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

<label>Current Condition</label>
        <textarea
          type="text"
          name="currentCondition"
          value={currentCondition}
          onChange={(e) => setCurrentCondition(e.target.value)}
        />

        <button type="submit">Update Your Plant</button>
      </form>

      <button onClick={deleteProject}>Delete Your Plant</button>
    </div>
  );
}

export default EditPlant;
