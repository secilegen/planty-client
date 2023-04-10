import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import DiseaseCard from "../../components/DiseaseCard";
import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";
import sunIcon from "../../images/sunIconBlack.png";
import heightIcon from "../../images/heightIconBlack.png";
import birthIcon from "../../images/birthIconBlack.png";
import conditionIcon from "../../images/conditionIconBlack.png";
import wateringIcon from "../../images/wateringIconBlack.png";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    axios
      .delete(`${API_URL}/api/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);

        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPlant();
  }, []);

  return (
    <div className="plantDetails">
      {plant && (
        <>
         <img className="plantImage" src={plant.image} alt="plant" />


          <div className="plantDetailContainer"></div>

          <div className="plantDetailHeader">
            <div className="plantHeaderLeft">
              <h3 className="plantName">{plant.nickname}</h3>
              <p className="commonName">{plant.common_name}</p>
            </div>

            <div className="plantHeaderRight">
              <Link to={`/plants/edit/${plantId}`}>
                <img src={editIcon} alt="edit icon" height="20px" className="plantDetailsEdit"/>
              </Link>

              <Link to={`/profile`}>
              <img
                src={deleteIcon}
                alt="delete"
                height="20px"
                onClick={deletePlant}
                className="plantDetailsDelete"
              />
              </Link>
            </div>
          </div>


          <div className="plantDetailContent">
          <div className="center">
            <div className="detailsPlant">
            <img src={sunIcon} alt="sun" className="plantDetailIcon"/>
              <p className="detailsCategory">Sunlight Positioning: </p>
              <p className="detailsResult">{plant.sunlightPositioning}</p>
            </div>
            

            <div className="detailsPlant">
            <img src={heightIcon} alt="height" className="plantDetailIcon"/>
              <p className="detailsCategory">Plant Height:</p>
              <p className="detailsResult">{plant.plantHeight} cm</p>
            </div>

            <div className="detailsPlant">
            <img src={birthIcon} alt="birth" className="plantDetailIcon"/>
              <p className="detailsCategory">Birth Date: </p>
              <p className="detailsResult">{plant.birthDate}</p>
            </div>

            <div className="detailsPlant">
            <img src={conditionIcon} alt="condition" className="plantDetailIcon"/>
              <p className="detailsCategory">Condition: </p>
              <p className="detailsResult">{plant.currentCondition}</p>
            </div>

            <div className="detailsPlant">
            <img src={wateringIcon} alt="watering" className="plantDetailIcon"/>
              <p className="detailsCategory">Watering: </p>
              <p className="detailsResult">{plant.watering}</p>
            </div>
          </div>
          </div>

      

          <hr width="65%" />
          <br/>
          <DiseaseCard disease={plant.disease} getPlant={getPlant} />
        </>
      )}
    </div>
  );
}

export default PlantDetails;
