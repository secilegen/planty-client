import { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function AddPlantForm(props) {
  const [nickname, setNickname] = useState("");
  const [sunlightPositioning, setSunlightPositioning] = useState("Low");
  const [image, setImage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("Thriving");
  const [apiId, setApiId] = useState("");

  const handleSelectSunlight = e => {
    setSunlightPositioning(e.target.value);
    

    console.log("selected", e.target.value);
  };

  const handleSelectCondition = e => {
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();


    const requestBody = {
      nickname,
      sunlightPositioning,
      image,
      plantHeight,
      birthDate,
      currentCondition,
      apiId
    };

    axios
      .post(`${API_URL}/api/plants`, requestBody)
      .then((response) => {
        // Reset the state
        setNickname("");
        setSunlightPositioning("Low");
        setImage("");
        setPlantHeight("");
        setBirthDate("");
        setCurrentCondition("Thriving");
        setApiId("")

        console.log("add plant", response)
       
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPlant">
      <h3>Add Your Plant</h3>

      <form onSubmit={handleSubmit}>
        <label>Nickname</label>
        <textarea
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <br/>

        <label>Sunlight Positioning</label>
        <select value={sunlightPositioning} onChange={handleSelectSunlight}>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
        </select>
        <br/>

        <label>Plant Image</label>
        <textarea
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br/>

        <label>Plant Height</label>
        <input
          type="number"
          name="plantHeight"
          value={plantHeight}
          onChange={(e) => setPlantHeight(e.target.value)}
        />

        <br/>

        <label>Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <br/>

        <label>Current Condition</label>
        <select value={currentCondition} onChange={handleSelectCondition}>
        <option value="Thriving">Thriving</option>
        <option value="Needs some attention">Needs some attention</option>
        <option value="Not good condition">Not good condition</option>
        </select>

        <br/>

        <label>apiId</label>
        <input
          type="number"
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
