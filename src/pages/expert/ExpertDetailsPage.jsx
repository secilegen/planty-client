import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";                     
import { AuthContext } from "../../context/auth.context"; 
import axios from 'axios'
import ExpertHeader from '../../components/ExpertHeader';

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function ExpertDetailsPage(props) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [expertToView, setExpertToView] = useState("")

  const {expertId} = useParams()

    useEffect(()=>{
      
      axios.get(`${API_URL}/api/expert/${expertId}`)
      .then(result=>{
  
        setExpertToView(result.data)
        console.log("This is the result from expert api call",result.data)
  
        console.log('Expert to view is', expertToView)
       })
      
    },[expertId])
  return (
    <div>
      {expertToView && (<div>
    <ExpertHeader expert={expertToView}/>
    
      </div>)}  
    
    </div>
  )
}

export default ExpertDetailsPage
