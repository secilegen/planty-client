import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import service from "../../api/service";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function EditPlant(props) {
    const [nickname, setNickname] = useState("");
    const [sunlightPositioning, setSunlightPositioning] = useState("");
    const [image, setImage] = useState("");
    const [plantHeight, setPlantHeight] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [currentCondition, setCurrentCondition] = useState("");
  
  const { plantId } = useParams();
  const navigate = useNavigate();

    // ******** this method handles the file upload ********
    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);
   
      const uploadData = new FormData();
   
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("image", e.target.files[0]);
   
      service
        .uploadImage(uploadData)
        .then(response => {
          console.log("fileURL", response.fileUrl)
          // console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImage(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };

    // Drop down

  const handleSelectSunlight = e => {
    setSunlightPositioning(e.target.value);
    

    console.log("selected", e.target.value);
  };

  const handleSelectCondition = e => {
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };
  
  useEffect(() => {
     // Get the token from the localStorage
     const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/plants/${plantId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }  
      )
      .then((response) => {
        const onePlant = response.data;
        setNickname(onePlant.nickname);
        setSunlightPositioning(onePlant.sunlightPositioning);
        setImage(onePlant.image);
        setPlantHeight(onePlant.plantHeight);
        setBirthDate(onePlant.birthDate);
        setCurrentCondition(onePlant.currentCondition);
      })
      .catch((error) => console.log(error));
    
  }, [plantId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { nickname, sunlightPositioning, image, plantHeight, birthDate, currentCondition };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers  

    axios
      .put(`${API_URL}/api/plants/${plantId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        navigate(`/plants/${plantId}`)
      });

  };
  
  
  const deletePlant = () => {
     // Get the token from the localStorage
     const storedToken = localStorage.getItem('authToken');      
    
     // Send the token through the request "Authorization" Headers 
    
    axios
      .delete(`${API_URL}/api/plants/${plantId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then(() => {
        navigate("/"); // navigate to user/id?
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditPlant">
      <h3>Edit Your Plant</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Nickname</label>
        <textarea
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

<label>Sunlight Positioning</label>
        <select value={sunlightPositioning} onChange={handleSelectSunlight}>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
        </select>
        <br/>

<label>Plant Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => handleFileUpload(e)}
        />

<label>Plant Height</label>
        <input
          type="number"
          name="plantHeight"
          value={plantHeight}
          onChange={(e) => setPlantHeight(e.target.value)}
        />

<label>Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

<label>Current Condition</label>
        <select value={currentCondition} onChange={handleSelectCondition}>
        <option value="Thriving">Thriving</option>
        <option value="Needs some attention">Needs some attention</option>
        <option value="Not good condition">Not good condition</option>
        </select>

        <br/>

        <button type="submit">Update Your Plant</button>
      </form>

      <button onClick={deletePlant}>Delete Your Plant</button>
    </div>
  );
}

export default EditPlant;
