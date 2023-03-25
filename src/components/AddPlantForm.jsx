import { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function AddPlantForm(props) {
  const [nickname, setNickname] = useState("");
  const [sunlight, setSunlight] = useState("Low");
  const [plantImage, setPlantImage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("Thriving");
  const [apiId, setApiId] = useState("");

  const handleSelect = e => {
    setSunlight(e.target.value);
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };


 
  const handleSubmit = (e) => {
    e.preventDefault();


    const requestBody = {
      nickname,
      sunlight,
      plantImage,
      plantHeight,
      birthDate,
      currentCondition,
    };

    axios
      .post(`${API_URL}/api/plants`, requestBody)
      .then((response) => {
        // Reset the state
        setNickname("");
        setSunlight("");
        setPlantImage("");
        setPlantHeight("");
        setBirthDate("");
        setCurrentCondition("");
       
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPlant">
      <h3>Add Your Plant</h3>

      <form onSubmit={handleSubmit}>
        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <br/>

        <label>Sunlight Positioning</label>
        <select value={sunlight} onChange={handleSelect}>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
        </select>
        <br/>

        <label>Plant Image</label>
        <textarea
          type="text"
          name="plantImage"
          value={plantImage}
          onChange={(e) => setPlantImage(e.target.value)}
        />

        <br/>

        <label>Plant Height</label>
        <textarea
          type="text"
          name="plantHeight"
          value={plantHeight}
          onChange={(e) => setPlantHeight(e.target.value)}
        />

        <br/>

        <label>Birth Date</label>
        <textarea
          type="text"
          name="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <br/>

        <label>Current Condition</label>
        <select value={currentCondition} onChange={handleSelect}>
        <option value="Thriving">Thriving</option>
        <option value="Needs some attention">Needs some attention</option>
        <option value="Not good condition">Not good condition</option>
        </select>

        <br/>

        <label>apiId</label>
        <textarea
          type="text"
          name="apiId"
          value={apiId}
          onChange={(e) => setApiId(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPlantForm;
