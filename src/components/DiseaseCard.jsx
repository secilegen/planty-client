import React from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function DiseaseCard(props) {
    const [selectedDisease, setSelectedDisease] = useState("")


    const { plantId } = useParams();
    const navigate = useNavigate();


    const deleteDisease = () => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');      
       
        // Send the token through the request "Authorization" Headers 
       
       axios
         .delete(`${API_URL}/api/disease/${plantId}`, {disease:selectedDisease},
         { headers: { Authorization: `Bearer ${storedToken}` } } 
         )
         .then((response) => {
            console.log(response.data)

           navigate(`/plants/${plantId}`); 
         })
         .catch((err) => console.log(err));
     };  

  return (

    <div>
    <h1>Disease</h1>

    <div>{props.disease.map(oneDisease => {
        return (
            <div key={oneDisease._id}>
            <img src={oneDisease.image} alt="disease" style={{width: "300px"}}/>
            <p>{oneDisease.name}</p>
            <p>Treatment: {oneDisease.treatment}</p>
            <p>Supplements: {oneDisease.supplements}</p>

            <button onClick={()=> {setSelectedDisease(oneDisease.id) ;deleteDisease()}}>Delete Disease</button>

            <br/>

            </div>
            )
            
    })}

        </div>

    </div>
  )
}

export default DiseaseCard