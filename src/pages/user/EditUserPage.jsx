import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../api/service";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function EditUserPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isCompany, setIsCompany] = useState("");
  const [typeOfCompany, setTypeOfCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [image, setImage] = useState("");
  const [errorMessageFirstName, setErrorMessageFirstName] = useState("");
  const [errorMessageLastName, setErrorMessageLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState('')

  const { userId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${user._id}`)
      .then((response) => {
        const userToEdit = response.data;
        setFirstName(userToEdit.firstName);
        setLastName(userToEdit.lastName);
        setIsCompany(userToEdit.isCompany);
        setCompanyName(userToEdit.companyName);
        setTypeOfCompany(userToEdit.setTypeOfCompany);
      })
      .catch((error) => console.log("Error occured editing the user", error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      firstName,
      lastName,
      isCompany,
      companyName,
      typeOfCompany,
      image,
    };

    if (!firstName) {
      setErrorMessageFirstName("Please add your first name");
    } else {
      setErrorMessageFirstName("");
    }

    if (!lastName) {
      setErrorMessageLastName("Please add your last name")
    } else {
      setErrorMessageLastName("");
    }
      
    if (firstName && lastName) {

    axios
      .put(`${API_URL}/api/user/${user._id}`, requestBody)
      .then((response) => {
        console.log("Updated user info:", response);
        setSuccessMessage(`You just updated your planty profile - it looks pretty`)
				setTimeout(() => {
                    
					navigate("/profile")
				}, 3000)
        
      })
      .catch((error) => {
       console.log("error with sign up", error)
      });
  }};

  return (
    <div className="EditProfile">
      <h1 className="detailHeadline">Edit Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>First Name</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="errorText">{errorMessageFirstName}</p>
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Last Name</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
             <p className="errorText">{errorMessageLastName}</p>
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Business User</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="checkbox"
              name="isCompany"
              value={isCompany}
              onChange={(e) => setIsCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Company Name</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Type of Company</label>
          </div>
          <div className="edit-profile-input">
            <select
              id=""
              name="typeOfCompany"
              value={typeOfCompany}
              onChange={(e) => setTypeOfCompany(e.target.value)}
            >
              <option value="Restaurant">Restaurant</option>
              <option value="Café">Café</option>
              <option value="Bar">Bar</option>
              <option value="Hotel">Hotel</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="edit-profile-box">
          <div className="edit-profile-label">
            <label>Profile Image</label>
          </div>
          <div className="edit-profile-input">
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        </div>

        <p className="successMessage">{successMessage}</p>
        <div className="submit-button">
          <button type="submit" className="small-button button-filled-green">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
