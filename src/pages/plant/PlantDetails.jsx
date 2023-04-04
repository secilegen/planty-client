import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function PlantDetails(props) {
  const [plant, setPlant] = useState(null);
  const { plantId } = useParams();

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
        </>
      )}

      <Link to={`/plants/edit/${plantId}`}>
        <button>Edit Plant</button>
      </Link>
    </div>
  );
}

export default PlantDetails;
