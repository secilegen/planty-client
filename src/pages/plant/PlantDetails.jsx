import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { format } from 'date-fns'
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
  const [watering, setWatering] = useState()
  const [sunFactor, setSunFactor] = useState(1)
  const [apiWaterFactor, setApiWaterFactor] = useState(1)

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
        console.log("Response is", response.data)
        setPlant(onePlant);
        if (onePlant.sunlightPositioning === "Low") {
          setSunFactor(0.8)
        }
        else if (onePlant.sunlightPositioning === "High" ) {
          setSunFactor(1.2)
        }
        else {setSunFactor(1)}

        if (onePlant.watering === "Minimum") {
          setApiWaterFactor(0.5)        }
        else if (onePlant.watering === "Frequent"  ) {
          setApiWaterFactor(1.5)
        }
        else {setApiWaterFactor(1)}

        // onePlant.sunlightPositioning === "Low" ? setSunFactor(0.8) : onePlant.sunlightPositioning === "High" ? setSunFactor(1.2) : setSunFactor(1);
        // onePlant.watering === "Minimal" ?  setApiWaterFactor(0.5) : onePlant.watering === "Frequent" ? setApiWaterFactor(1.5) : setApiWaterFactor(1);
        console.log(onePlant)
        console.log("Watering is", apiWaterFactor)
        console.log("Sun factor is ", sunFactor)
      })
      .catch((error) => console.log(error));
  };

  // const calculateWatering = (plant) => {
  //   const amount = plant.plantHeight * 0.4 * sunFactor * apiWaterFactor
  // } 

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
    // calculateWatering(plant)
  }, []);

  return (
    <div className="plantDetails">
      {plant && (
        <>
        <div className="plantDetailsBG">
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
              <p className="detailsResult">{plant.plantHeight * 0.4 * sunFactor * apiWaterFactor *5} ml every 5 days</p>
            </div>

            {/* <div>Watering amount: {plant.plantHeight * 0.4 * sunFactor * apiWaterFactor *5}</div> */}
          </div>
          </div>
<br/>
        <hr width="65%" />
          <br/>
          <DiseaseCard disease={plant.disease} getPlant={getPlant} />
        </>
      )}
      <br/>
      <Link to={`/profile`}>
      <button  className="buttonFramedBooking">Back to profile</button>
      
      </Link>
    </div>
  );
}

export default PlantDetails;
