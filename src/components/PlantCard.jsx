import React from "react";
import { Link } from "react-router-dom";
import addIcon from "../images/addIconSalmon.png";
import editIcon from "../images/editIcon.png";
import viewDetails from "../images/viewDetails.png";
import conditionIcon from "../images/conditionIconBlack.png";
import wateringIcon from "../images/wateringIconBlack.png";

function PlantCard(props) {
  return (
    <div >

<div className='diseaseHeader'>
      <h2>My Plants</h2>

      <Link to={`/plants`}>
        <img src={addIcon} alt="add icon" height="30px" />
      </Link>
      </div>

      <div>
        
        {props?.plants && props.plants.map((onePlant) => {
          return (
            <div key={onePlant._id} className="plantCard">
              <img
                src={onePlant.image}
                alt="plant"
                style={{ width: "300px" }}
                className="plantCardImage"
              />
              <div className="plantDetailHeader">
                <div className="plantHeaderLeft">
                  <h3 className="plantName">{onePlant.nickname}</h3>
                </div>

                <div className="plantHeaderRight">
                  <Link to={`/plants/${onePlant._id}`}>
                    <img
                      src={viewDetails}
                      alt="details icon"
                      height="25px"
                      className="viewDetailsIcon"
                    />
                  </Link>

                  <Link to={`/plants/edit/${onePlant._id}`}>
                    <img src={editIcon} alt="edit icon" height="25px" />
                  </Link>
                </div>
              </div>

<div className="plantCardContainer">
              <div className="plantCardLeft">
                <img
                  src={wateringIcon}
                  alt="watering"
                  className="plantCardIcon"
                />
                <p className="plantCardContent">{onePlant.watering}</p>
              </div>
              <div className="plantCardRight">
                <img
                  src={conditionIcon}
                  alt="condition"
                  className="plantCardIcon"
                />
                <p className="plantCardContent">{onePlant.currentCondition}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br/>
    </div>
  );
}

export default PlantCard;
