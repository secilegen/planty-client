import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";

const apiURL =
  "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
  const [errorMessage, setErrorMesage] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // image => this name has to be the same as in the model since we pass

    uploadData.append("image", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log("fileURL", response.fileUrl);
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // Handle drop down

  const handleSelectSunlight = (e) => {
    setSunlightPositioning(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSelectCondition = (e) => {
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };

  useEffect(() => {
    console.log("useEffect - initial render");
    if (query !== "") {
      axios
        .get(apiURL, { params: { q: query } })
        .then((response) => {
          console.log("api values", response.data.data)
          setPlant(response.data.data);
          setFetching(false);

          console.log("show api plants", response);
          console.log("query", query);
          console.log("plants", plant.length);
        })

        .catch((error) => {
          console.log("Error calling API" + error);
        });
    } else if (query === "") {
      setPlant([]);
    }
  }, [query]);

  // Thanks to Henrique it works
  const handleClick = (common_name, watering, apiId) => {
    // e.preventDefault();
    // console.log("handleClick for API plant", e.target.parentNode.childNodes[1].childNodes[1]);
    setCommon_Name(common_name);
    setWatering(watering);
    setApiId(apiId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      common_name,
      user: user._id,
      watering,
      nickname,
      sunlightPositioning,
      image,
      plantHeight,
      birthDate,
      currentCondition,
      apiId,
    };

    // Error handling

    if (!nickname) {
      setErrorMesage("We need a nickname for your plant");
    }

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

        navigate("/profile");

        console.log("add plant", response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPlant">
      {fetching && <p className="loading">Loading ...</p>}

      <div className="booking-box">
          <div className="booking-label">
      <label>Search Plant</label>
      </div>
      <div className="booking-input">
      <input
        value={query}
        type="search"
        placeholder="search for plant names"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      </div>
      </div>
      {/* {search(plant).map((result) => { */}

      {plant.map((result) => {
        return (
          
          <div key={result.id} className="apiPlant">
          <div className="searchCard">
          <div className="searchInfo">
          <div className="searchCardLeft">
            <img
              src={result.default_image.thumbnail}
              id="imageAPI"
              alt="plant"
              className="apiImage"
            />
            </div>

            <div className="searchCardRight">
            <p className="labelSearch">
              Common Name:
              <input
                id="commonName"
                type="text"
                name="common_name"
                readOnly={true}
                value={result.common_name}
                className="inputSearch"
              />
            </p>
            <p className="labelSearch">
              Watering:
              <input
                id="watering"
                type="text"
                name="watering"
                readOnly={true}
                value={result.watering}
                className="inputSearch"
              />
            </p>
          
            <p className="labelSearch">
              Plant Number:
              <input
                id="apiId"
                type="text"
                name="apiId"
                readOnly={true}
                value={result.id}
                className="inputSearch"
              />
            </p>
            
            </div>
            </div>
            {/* <p>Plant Id: {result.id}</p> */}
            <button className="small-button" type="button" onClick={()=> {handleClick(result.common_name, result.watering, result.id)}}>add to plant profile</button>
          </div>
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <div className="booking-box">
          <div className="booking-label">
            <label>Nickname</label>
          </div>

          <div className="booking-input">
            <textarea
              type="text"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Sunlight Positioning</label>
          </div>
          <div className="booking-input">
            <select value={sunlightPositioning} onChange={handleSelectSunlight}>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Plant Image</label>
          </div>

          <div className="booking-input">
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Plant Height</label>
          </div>

          <div className="booking-input">
            <input
              type="number"
              name="plantHeight"
              value={plantHeight}
              onChange={(e) => setPlantHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Birth Date</label>
          </div>

          <div className="booking-input">
            <input
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </div>

        <div className="booking-box">
          <div className="booking-label">
            <label>Current Condition</label>
          </div>
          <div className="booking-input">
            <select value={currentCondition} onChange={handleSelectCondition}>
              <option value="Thriving">Thriving</option>
              <option value="Needs some attention">Needs some attention</option>
              <option value="Not good condition">Not good condition</option>
            </select>
          </div>
        </div>

        <button type="submit" className="small-button button-filled-green">Submit</button>
      </form>
    </div>
  );
}

export default AddPlantForm;
