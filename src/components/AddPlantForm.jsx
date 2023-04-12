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
  const [nickname, setNickname] = useState("");
  const [sunlightPositioning, setSunlightPositioning] = useState("Low");
  const [image, setImage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("Thriving");
  const [apiId, setApiId] = useState("");
  const [fetching, setFetching] = useState(false);
  const [plant, setPlant] = useState([]);
  const [query, setQuery] = useState("");
  const [errorMessageNickname, setErrorMessageNickname] = useState("");
  const [errorMessagePlantHeight, setErrorMessagePlantHeight] = useState("");
  const [errorMessageBirthDate, setErrorMessageBirthDate] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loadingImage, setLoadingImage] = useState("")

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // image => this name has to be the same as in the model since we pass

    uploadData.append("image", e.target.files[0]);
    setLoadingImage("Loading ...")

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log("fileURL", response.fileUrl);
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setLoadingImage("")
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
      setFetching(true);
      axios
        .get(apiURL, { params: { q: query } })
        .then((response) => {
          console.log("api values", response.data.data);
          setPlant(response.data.data);
          setFetching(false);

          console.log("show api plants", response);
          console.log("query", query);
          console.log("plants", plant.length);
          setFetching(false);
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
    setQuery("");
  };

  useEffect(() => {
    if (submit) {
      if (!nickname) {
        setErrorMessageNickname("Please add a nickname for your plant");
      } else {
        setErrorMessageNickname(" ");
      }

      if (!plantHeight) {
        setErrorMessagePlantHeight(
          "Please tell us the plant height that we can calculate the right watering"
        );
      } else {
        setErrorMessagePlantHeight("");
      }

      if (!birthDate) {
        setErrorMessageBirthDate("Please add the birth date of your plant");
      } else {
        setErrorMessageBirthDate("");
      }

      if (!image) {
        setErrorMessageImage("Please upload a plant picture");
      } else {
        setErrorMessageImage("");
      }
    }
  }, [nickname, plantHeight, birthDate, image, submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

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

    if (nickname && plantHeight && birthDate && image) {
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

          setSuccessMessage(
            `We added your plant to your profile - you will be redirected to your profile`
          );
          setTimeout(() => {
            navigate("/profile");
          }, 3000);

          // navigate("/profile");

          console.log("add plant", response);
        })
        .catch((error) => {
          console.log(
            "We  couldn't add your plant to your profile - try it again",
            error
          );
        });
    }
  };

  return (
    <div className="AddPlant">
      {/* {fetching && <p className="loading">Loading ...</p>} */}

      <div className="booking-box">
        <div className="booking-label">
          {/* <label>Search Plant</label> */}
          {common_name == false ? (
            <p className="addSubs">1. Search for the common plant name</p>
          ) : (
            <p className="addSubs">
              1. Search again, when you want to change the common name
            </p>
          )}
        </div>
        <div className="booking-input inputField">
          <input
            value={query}
            type="search"
            placeholder="common name search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </div>
      {fetching ? (
        <p className="loading">Loading ...</p>
      ) : (
        plant.map((result) => {
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
                <button
                  className="buttonFramedApiSearch"
                  type="button"
                  onClick={() => {
                    handleClick(result.common_name, result.watering, result.id);
                  }}
                >add to plant profile
                </button>
              </div>
            </div>
          );
        })
      )}

      <form onSubmit={handleSubmit}>
        <div className="booking-box">
          <p className="commonName2">Common Name</p>
          <p className="commonName3">{common_name}</p>

          <p className="addSubs">2. Add your plant information</p>

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
            <p className="errorText">{errorMessageNickname}</p>
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
            <p className="loading">{loadingImage}</p> 
            
            <p className="errorText">{errorMessageImage}</p>
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
            <p className="errorText">{errorMessagePlantHeight}</p>
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
            <p className="errorText">{errorMessageBirthDate}</p>
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

        <p className="successMessage">{successMessage}</p>

        <button type="submit" className="small-button button-filled-green">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPlantForm;
