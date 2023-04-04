import React from 'react'
import { Link } from "react-router-dom";

function PlantCard(props) {
  return (
    <div>
        <h1>My Plants</h1>
        <div>{props.plants.map(onePlant => {
            return (
                <div key={onePlant._id}>
                    <h3>{onePlant.nickname}</h3>
                    <img src={onePlant.image}/>
                    <h5>Watering status will come here</h5>
                    <h5>{onePlant.currentCondition}</h5>
                    <Link to={`/plants/edit/${onePlant._id}`}>
                         <img src="icon.png"/>
                        </Link>
                    <Link to="/profile/edit">
                        <img src="icon.png"/>
                        </Link>
                </div>
            )
        })}</div>
    </div>
  )
}

export default PlantCard
