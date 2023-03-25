import { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function AddUserForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  

 
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
        <textarea
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUserForm;