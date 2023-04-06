// import typeOfDisease from "../disease.json";
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'


function AddDisease(props) {
    
    const [diseaseAll, setDiseaseAll] = useState([])
    const [selectedDisease, setSelectedDisease] = useState("")

    const { plantId } = useParams();


    const getAllDiseases = () => {
        axios
          .get(`${API_URL}/api/disease`)
          .then((response) => setDiseaseAll(response.data))
          .catch((error) => console.log(error));
      };
    
    
      useEffect(() => {
        getAllDiseases();
      }, [] );

      // Edit plant and add disease to plant

      const addDiseaseToPlant = (e) => {
        const storedToken = localStorage.getItem('authToken');
       
        axios
        .put(`${API_URL}/api/disease/${plantId}`,{disease:selectedDisease} ,
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => { 
            console.log(response.data)
           
        })

      }

    

  return (
    <div>
    
    <h1>Add a disease to your planty</h1>

    {diseaseAll.map(disease => {

        return (
        <div >
        <img src={disease.image} alt="plant" style={{width: "300px"}}/>
        <p>Name: {disease.name}</p>
        <p>Symptoms: {disease.symptoms}</p>
        <p>Treatment: {disease.treatment}</p>
        <p>Recovery Time: {disease.recoveryTime}</p>
        <p>Contagious: {disease.isContagious}</p>
        <p>Supplements: {disease.supplements}</p>

        <button onClick={()=>{setSelectedDisease(disease._id) ;addDiseaseToPlant()}}>add disease to your plant</button>
        </div>
        )
    })}

    <br/>

    <Link to={`/plants/${plantId}`}>
        <button>Back to profile</button>
      </Link>  
    
    </div>
  )
}

export default AddDisease