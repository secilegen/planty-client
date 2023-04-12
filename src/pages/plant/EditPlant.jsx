import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../api/service";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditPlant(props) {
  const [nickname, setNickname] = useState("");
  const [sunlightPositioning, setSunlightPositioning] = useState("");
  const [image, setImage] = useState("");
  const [plantHeight, setPlantHeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentCondition, setCurrentCondition] = useState("");
  const [errorMessageNickname, setErrorMessageNickname] = useState("");
  const [errorMessagePlantHeight, setErrorMessagePlantHeight] = useState("");
  const [errorMessageBirthDate, setErrorMessageBirthDate] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loadingImage, setLoadingImage] = useState("")

  const { plantId } = useParams();
  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
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

  // Drop down

  const handleSelectSunlight = (e) => {
    setSunlightPositioning(e.target.value);

    console.log("selected", e.target.value);
  };

  const handleSelectCondition = (e) => {
    setCurrentCondition(e.target.value);

    console.log("selected", e.target.value);
  };

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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

  useEffect(() => {
    if (submit) {
      if (!nickname) {
        setErrorMessageNickname("Please add a nickname for your plant");
      } else {
        setErrorMessageNickname("");
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmit(true)
    
    const requestBody = {
      nickname,
      sunlightPositioning,
      image,
      plantHeight,
      birthDate,
      currentCondition,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    if (nickname && plantHeight && birthDate && image) {
      axios
        .put(`${API_URL}/api/plants/${plantId}`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setSuccessMessage(
            `We updated your plant - you will be redirected to your profile`
          );
          setTimeout(() => {
            navigate(`/plants/${plantId}`);
          }, 3000);
          // navigate(`/plants/${plantId}`)
        });
    }
  };

  const deletePlant = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    axios
      .delete(`${API_URL}/api/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/"); // navigate to user/id?
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditPlant">
      <h1 className="detailHeadline">Edit Your Plant</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="booking-box">
          <div className="booking-label">
            <label>Nickname</label>
          </div>
          <textarea
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <p className="errorText">{errorMessageNickname}</p>
        </div>
        <br />

        <div className="booking-box">
          <div className="booking-label">
            <label>Sunlight Positioning</label>
          </div>
          <select value={sunlightPositioning} onChange={handleSelectSunlight}>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>
        <br />

        <div className="booking-box">
          <div className="booking-label">
            <label>Plant Image</label>
          </div>
          <input
            type="file"
            name="image"
            onChange={(e) => handleFileUpload(e)}
          />
           <p className="loading">{loadingImage}</p> 
          <p className="errorText">{errorMessageImage}</p>
        </div>
        <br />

        <div className="booking-box">
          <div className="booking-label">
            <label>Plant Height</label>
          </div>
          <input
            type="number"
            name="plantHeight"
            value={plantHeight}
            onChange={(e) => setPlantHeight(e.target.value)}
          />
          <p className="errorText">{errorMessagePlantHeight}</p>
        </div>
        <br />

        <div className="booking-box">
          <div className="booking-label">
            <label>Birth Date</label>
          </div>
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <p className="errorText">{errorMessageBirthDate}</p>
        </div>
        <br />

        <div className="booking-box">
          <div className="booking-label">
            <label>Current Condition</label>
          </div>
          <select value={currentCondition} onChange={handleSelectCondition}>
            <option value="Thriving">Thriving</option>
            <option value="Needs some attention">Needs some attention</option>
            <option value="Not good condition">Not good condition</option>
          </select>
        </div>

        <br />
        <br />

        <p className="successMessage">{successMessage}</p>

        <button className="small-button button-filled-green" type="submit">
          Update Your Plant
        </button>
      </form>

      <br />

      <button className="small-button" onClick={deletePlant}>
        Delete Your Plant
      </button>
    </div>
  );
}

export default EditPlant;
