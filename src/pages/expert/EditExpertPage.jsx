import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../api/service";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditExpertPage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState("");
  const [experienceLevel, setExperienceLevel] = useState();
  const [favoritePlants, setFavoritePlants] = useState([]);
  const [availability, setAvailability] = useState("");
  const [availableOnline, setAvailableOnline] = useState("");
  const [expertLocation, setExpertLocation] = useState("");
  const [price, setPrice] = useState();
  const [errorMessageLocation, setErrorMessageLocation] = useState("");
  const [errorMessagePrice, setErrorMessagePrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loadingImage, setLoadingImage] = useState("")

  const { expertId } = useParams();
  const navigate = useNavigate();

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
        setProfileImage(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/expert/${user._id}`)
      .then((response) => {
        const expertToEdit = response.data;
        setExperienceLevel(expertToEdit.experienceLevel);
        setAvailability(expertToEdit.availability);
        setAvailableOnline(expertToEdit.availableOnline);
        setExpertLocation(expertToEdit.expertLocation);
        setPrice(expertToEdit.price);
      })
      .catch((error) => console.log("Error occured editing expert:", error));
  }, []);

  useEffect(() => {
    if (submit) {
      if (!expertLocation) {
        setErrorMessageLocation("Please add your location");
      } else {
        setErrorMessageLocation("");
      }

      if (!price) {
        setErrorMessagePrice("Please add your price");
      } else {
        setErrorMessagePrice("");
      }
    }
  }, [expertLocation, price, submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    const requestBody = {
      experienceLevel,
      availability,
      availableOnline,
      expertLocation,
      price,
      profileImage,
    };

    if (expertLocation && price) {
      axios
        .put(`${API_URL}/api/expert/${user._id}`, requestBody)
        .then((response) => {
          setSuccessMessage(
            `You just updated your planty expert profile - it looks pretty`
          );
          setTimeout(() => {
            navigate("/expert/profile");
          }, 3000);
        })
        .catch((error) => {
          console.log("error with sign up", error);
        });
    }
  };

  return (
    <div className="EditProfile">
      <h1 className="detailHeadline">Edit Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Experience Level</label>
          </div>
          <div className="edit-profile-input">
            <select
              id=""
              name="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
            <option>Select</option>
              <option value="1-3 years">1-3 years</option>
              <option value="4-6 years">4-6 years</option>
              <option value="more than 6 years">more than 6 years</option>
            </select>
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Availability</label>
          </div>
          <div className="edit-profile-input">
            <select
              id=""
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="true">I am available for new bookings</option>
              <option value="false">I am NOT available for new bookings</option>
            </select>
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Do you want to offer your services online?</label>
          </div>
          <div className="edit-profile-input">
            <select
              id=""
              name="availableOnline"
              value={availableOnline}
              onChange={(e) => setAvailableOnline(e.target.value)}
            >
            <option>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

          </div>
          </div>

          <div className="edit-profile-box">

          <div className="edit-profile-label">

          <label>Location</label>
          </div>
          <div className="edit-profile-input">
          <CountryDropdown
          value={expertLocation}
          onChange={(expertLocation) => setExpertLocation(expertLocation)} />
            {/* <input
              type="text"
              name="expertLocation"
              value={expertLocation}
              onChange={(e) => setExpertLocation(e.target.value)}
            /> */}
            <p className="errorText">{errorMessageLocation}</p>
          </div>
          </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Price</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="errorText">{errorMessagePrice}</p>
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Profile Image</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="file"
              name="profileImage"
              onChange={(e) => handleFileUpload(e)}
            />
             <p className="loading">{loadingImage}</p> 
          </div>
        </div>

        <p className="successMessage">{successMessage}</p>

        <div className="submit-button">
          <button type="submit" className="small-button button-filled-green">
            Save Changes
          </button>
        </div>
      </form>

      {/* <button onClick={deleteExpert}>Delete Your Plant</button> */}
    </div>
  );
}

export default EditExpertPage;
