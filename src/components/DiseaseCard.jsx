import React from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from "react";
import addIcon from "../images/addIconSalmon.png";
import treatmentIcon from "../images/treatmentIconBlack.png";
import supplementIcon from "../images/supplementIconBlack.png";
import deleteIcon from "../images/deleteIcon.png";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function DiseaseCard(props) {
    console.log("props", props)
    const [selectedDisease, setSelectedDisease] = useState("")


    const { plantId } = useParams();
    const navigate = useNavigate();


    const deleteDisease = (diseaseId) => {
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');      
       
        // Send the token through the request "Authorization" Headers 
       
       axios
         .put(`${API_URL}/api/disease/${plantId}/delete`, {disease:diseaseId},
         { headers: { Authorization: `Bearer ${storedToken}` } } 
         )
         .then((response) => {
            console.log(response.data)
            props.getPlant()
           navigate(`/plants/${plantId}`); 
         })
         .catch((err) => console.log(err));
     };  

  return (

    <div>
    <div className='diseaseHeader'>
    <h3>Disease</h3>
    <Link to={`/disease/${plantId}`}>
      <img src={addIcon} alt="edit icon" height="25px" className='addDiseaseIcon'/>
      </Link>
    </div>

    <div>{props.disease.map(oneDisease => {
        console.log("oneDisease", oneDisease._id)
        return (
            <div key={oneDisease._id}>
            <img src={oneDisease.image} alt="disease" className='diseaseImage'/>

            <div className='diseaseType'>
            <p className='diseaseName'>{oneDisease.name}</p>
            {/* <button onClick={()=> {setSelectedDisease(oneDisease.id) ;deleteDisease()}}></button> */}
            <img src={deleteIcon} alt="delete" onClick={()=> {deleteDisease(oneDisease._id)}} className="diseaseDeleteIcon"/>
            
            </div>

            <div className='diseaseSubline'>
            <img src={treatmentIcon} alt="treatment" className='diseaseIcon'/>
            <p>Treatment </p>
            </div>
            <p className='diseaseContent'>{oneDisease.treatment}</p>

            <div className='diseaseSubline'>
            <img src={supplementIcon} alt="supplement" className='diseaseIcon'/>
            <p>Supplements </p>
            </div>
            <p className='diseaseContent'>{oneDisease.supplements}</p>

            

            <br/>

            </div>
            )
            
    })}

        </div>

    </div>
  )
}

export default DiseaseCard