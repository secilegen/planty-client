import React from 'react'
import { useContext, useEffect, useState } from "react";                     
import { AuthContext } from "../../context/auth.context"; 
import axios from 'axios'
import { Link } from "react-router-dom";
import ExpertHeader from '../../components/ExpertHeader';
import BookingCard from "../../components/BookingCard";


const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

function ExpertProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [expertToView, setExpertToView] = useState("")

  useEffect(()=>{
    (user &&
    axios.get(`${API_URL}/api/expert/${user._id}`)
    .then(result=>{

      setExpertToView(result.data)
      console.log("This is the result from expert api call",result.data)

      console.log('Expert to view is', expertToView)
     })
    )
  },[])

  return (
    <div>
      {expertToView && (<div>
    <ExpertHeader expert={expertToView}/>

    <BookingCard bookings={expertToView.bookings}/>
      </div>)}  
    
    </div>
    )
}

export default ExpertProfilePage