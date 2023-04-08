// import typeOfDisease from "../disease.json";
import axios from "axios";
import { useNavigate, useParams,Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function BookingSelection(props) {

    const [experts, setExperts] = useState([])

    const getExperts = () =>{
        axios
        .get(`${API_URL}/api/expert`)
        .then((response)=>{
            console.log('Api response from get all experts is', response.data)
            setExperts(response.data)
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getExperts();
    }, [])

  return (
    <div>
        <h3>Select an expert</h3>
        {experts.map(expert=>{
            return (
                <div key={expert._id}>
                <img src={expert.image}/>
                <h3>{expert.firstName} {expert.lastName}</h3>
                <button onClick={()=>props.selectExpert(expert._id)}>Select</button>
                </div>)
        })}
    </div>
  )
}

export default BookingSelection