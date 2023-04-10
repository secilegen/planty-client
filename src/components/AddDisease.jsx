// import typeOfDisease from "../disease.json";
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import treatmentIcon from "../images/treatmentIconBlack.png";
import supplementIcon from "../images/supplementIconBlack.png";
import symptomsIcon from "../images/symptomsIconBlack.png";
import timeIcon from "../images/timeIconBlack.png";
import alertIcon from "../images/alertIconBlack.png";
import addIcon from "../images/addIconSalmon.png"

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'




function AddDisease(props) {
    
    const [diseaseAll, setDiseaseAll] = useState([])
    const [selectedDisease, setSelectedDisease] = useState("1")
    const [newDisease,setNewDisease]=useState('')

    const { plantId } = useParams();
    const navigate = useNavigate();


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

      const addDiseaseToPlant = (diseaseId) => {
        const storedToken = localStorage.getItem('authToken');
       console.log("selcted disease", selectedDisease)
        axios
        .put(`${API_URL}/api/disease/${plantId}`,{disease:diseaseId} ,
        { headers: { Authorization: `Bearer ${storedToken}` } })

        .then((response) => { 
            console.log(response.data)

            navigate(`/plants/${plantId}`)
           
        })
        .catch((err) => console.log(err));

      }
      
      
  return (
    <div>
    
    <h2 className="detailHeadline">Add a disease to your planty</h2>

    {diseaseAll.map(disease => {
      console.log("disease", disease)
        return (
        <div key={disease._id}>
        <img  src={disease.image} alt="plant" style={{width: "300px"}} className="diseaseDetailsImage"/>

        <div className='diseaseType'>
        <p className='diseaseName'>{disease.name}</p>
       <img src={addIcon} alt="add" onClick={()=>{addDiseaseToPlant(disease._id)}} className="diseaseDeleteIcon" />
        {/* <button onClick={()=>{addDiseaseToPlant(disease._id)}}>add disease to your plant</button> */}
        </div>

        <div className='diseaseSubline'>
        <img src={symptomsIcon} alt="symptoms" className='diseaseIcon'/>
        <p>Symptoms</p> 
        </div>
        <p className='diseaseContent'>{disease.symptoms}</p>
       

        <div className='diseaseSubline'>
        <img src={treatmentIcon} alt="treatment" className='diseaseIcon'/>
        <p>Treatment</p> 
        </div>
        <p className='diseaseContent'>{disease.treatment}</p>
        

        <div className='diseaseSubline'>  
        <img src={timeIcon} alt="time" className='diseaseIcon'/>
        <p>Recovery Time  {disease.recoveryTime}</p> 
        </div>
       
        

        <div className='diseaseSubline'>
        <img src={alertIcon} alt="alert" className='diseaseIcon'/>  
        <p>Contagious</p> 
        </div>
        <p className='diseaseContent'>{disease.isContagious}</p>

        <div className='diseaseSubline'> 
        <img src={supplementIcon} alt="supplement" className='diseaseIcon'/>
        <p>Supplements</p>
        </div>
        <p className='diseaseContent'>{disease.supplements}</p>

        <br/>
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