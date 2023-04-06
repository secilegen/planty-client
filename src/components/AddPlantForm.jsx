import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";



const apiURL = "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";
const API_URL = "http://localhost:5005";

function AddPlantForm(props) {
  const [common_name, setCommon_Name] = useState("");
  const [watering, setWatering] = useState("");
  // const [imageAPI, setImageAPI] = ("");
  const [nickname, setNickname] = useState("");
  const [sunlightPositioning, setSunlightPositioning] = useState("Low");
  const [image, setImage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("Thriving");
  const [apiId, setApiId] = useState("");
  const [fetching, setFetching] = useState(true);
  const [plant, setPlant] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
 
  const {user} = useContext(AuthContext)

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

  // Handle drop down

  const handleSelectSunlight = e => {
    setSunlightPositioning(e.target.value);
    

    console.log("selected", e.target.value);
  };

  const handleSelectCondition = e => {
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };

  useEffect(() => {
    console.log("useEffect - initial render");
    if (query !== "") {

    axios.get(apiURL, {params:{q:query}}).then((response) => {
      setPlant(response.data.data);
      setFetching(false);

      console.log("show api plants", response);
      console.log("query", query)
      console.log("plants", plant.length)
    })
    
    .catch(error => {
        console.log("Error calling API" + error)
    })

    
  } else if (query === "") {
    setPlant([])
  }
    

}, [query]);

// Thanks to Henrique it works
const handleClick = (e) => {
  e.preventDefault();
  console.log("handleClick", e.target.parentNode.childNodes[1].childNodes[1].value)
  setCommon_Name(e.target.parentNode.childNodes[1].childNodes[1].value)
  setWatering(e.target.parentNode.childNodes[2].childNodes[1].value)
  setApiId(e.target.parentNode.childNodes[3].childNodes[1].value)
}

 
  const handleSubmit = (e) => {
    e.preventDefault();


    const requestBody = {
      common_name,
      user:user._id,
      watering,
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
        setApiId("");
        setCommon_Name("");
        setWatering("");
        // setImageAPI("");

        navigate("/profile")

        console.log("add plant", response)
       
      })
      .catch((error) => console.log(error));
  };




  return (
    <div className="AddPlant">
     
   
     

      {fetching && <p>Loading ...</p>}

<label>Search Plant</label>
<input
  value={query}
  type="search"
  placeholder="search for plant names"
  onChange={(e) => {
    setQuery(e.target.value);
  }}
/>
{/* {search(plant).map((result) => { */}

{plant.map((result) => {
  return (
    <div key={result.id} className="apiPlant">
    <img src={result.default_image.thumbnail} id="imageAPI" alt="plant"/>
   <p>Common Name:  <input id="commonName" type="text" name="common_name" readOnly={true} value={result.common_name}/></p>
   <p>Watering: <input id="watering" type="text" name="watering" readOnly={true} value={result.watering}/></p>
   <p>Plant Number: <input id="apiId" type="text" name="apiId" readOnly={true} value={result.id}/></p>
   {/* <p>Plant Id: {result.id}</p> */}
   <button onClick={handleClick}>add to plant profile</button>
  
   </div>
  );
})}


<form onSubmit={handleSubmit}>



     
      {/* <SearchApiPlant/> */}

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
        <input
          type="file"
          name="image"
          onChange={(e) => handleFileUpload(e)}
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

        {/* <label>apiId</label>
        <input
          type="number"
          name="apiId"
          value={apiId}
          onChange={(e) => setApiId(e.target.value)}
        /> */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPlantForm;
