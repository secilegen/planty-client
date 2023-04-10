import React from "react";
import { Link } from "react-router-dom";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png"

function PlantCard(props) {

   

  return (
    <div>
      <h1>My Plants</h1>

      <Link to={`/plants`}>
        <img src={addIcon} alt="add icon" height="30px" />
      </Link>

      <div>
        {props.plants.map((onePlant) => {
          return (
            <div key={onePlant._id}>
              
              <img
                src={onePlant.image}
                alt="plant"
                style={{ width: "300px" }}
              />
              <h3>{onePlant.nickname}</h3>
              <h5>Watering status will come here</h5>
              <h5>{onePlant.currentCondition}</h5>

              <Link to={`/plants/${onePlant._id}`}>
                <img src={viewDetails} alt="details icon" height="25px" />
              </Link>

              <Link to={`/plants/edit/${onePlant._id}`}>
                <img src={editIcon} alt="edit icon" height="25px" />
              </Link>

            
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlantCard;
