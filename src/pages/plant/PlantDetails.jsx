import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import DiseaseCard from "../../components/DiseaseCard";


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function PlantDetails(props) {
  const [plant, setPlant] = useState(null);
  const { plantId } = useParams();
  const navigate = useNavigate();

  const getPlant = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePlant = response.data;
        setPlant(onePlant);
      })
      .catch((error) => console.log(error));
  };

  const deletePlant = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');      
   
    // Send the token through the request "Authorization" Headers 
   
   axios
     .delete(`${API_URL}/api/plants/${plantId}`,
     { headers: { Authorization: `Bearer ${storedToken}` } } 
     )
     .then((response) => {
        console.log(response.data)

       navigate(`/profile`); 
     })
     .catch((err) => console.log(err));
 };  

  useEffect(() => {
    getPlant();
  }, []);

  return (
    <div className="PlantDetails">
      <h1>PlantDetails</h1>

      {plant && (
        <>
          <h1>{plant.nickname}</h1>
          <p>{plant.image}</p>
          <p>{plant.common_name}</p>
          <p>{plant.sunlightPositioning}</p>
          <p>{plant.plantHeight}</p>
          <p>{plant.birthDate}</p>
          <p>{plant.currentCondition}</p>
          <p>{plant.watering}</p>
          <DiseaseCard disease={plant.disease}/>
        </>
      )}

    
      <Link to={`/disease/${plantId}`}>
        <button>Add disease</button>
      </Link>  

      <Link to={`/plants/edit/${plantId}`}>
        <button>Edit Plant</button>
      </Link>
      <button onClick={deletePlant}>Delete Plant</button>
    </div>
  );
}

export default PlantDetails;
