import { useState } from "react";
import axios from "axios";
import service from "../api/service";


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function AddUserForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
 
  
   // ******** this method handles the file upload ********
   const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // image => this name has to be the same as in the model since we pass
    
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

 
  const handleSubmit = (e) => {
    e.preventDefault();

    

    const requestBody = {
      firstName,
      lastName,
      image,
   
    };

    axios
      .post(`${API_URL}/api/user`, requestBody)
      .then((response) => {
        // Reset the state
        setFirstName("");
        setLastName("");
        setImage("");
       
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPlant">
      <h3>Your Profile</h3>

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <br/>

       

        <label>Last Name</label>
        <textarea
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <br/>

        <label>Your Profile Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => handleFileUpload(e)}
        />

        <br/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUserForm;