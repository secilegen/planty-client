import React from 'react'
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import PlantForInspiration from '../components/PlantForInspiration';
import Header from '../images/Header.png'
import Body from '../images/Body.jpg'
import CtaButton from '../components/CtaButton';
import PlantCard from '../components/PlantCard';
import GuestHomePage from '../components/GuestHomePage';
import BookingCard from '../components/BookingCard';
import axios from 'axios'

 
const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

const apiURL = "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";

function HomePage() {
  const {isLoggedIn, user, logOutUser, isExpert} = useContext(AuthContext)
  const [userToView, setUserToView] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
   !isExpert && (user && axios.get(`${API_URL}/api/user/${user._id}`)
    .then(result=>{

      setUserToView(result.data)
      setIsLoading(false)
      console.log('User to view is', userToView)
      console.log(userToView)
     }))
    isExpert && (
      user && axios.get(`${API_URL}/api/expert/${user._id}`)
    .then(result=>{

      setUserToView(result.data)
      setIsLoading(false)
      console.log('User to view is', userToView)
      console.log(userToView)
     })
    )
  },[user])

    const randomPage = Math.floor(Math.random() * 200) + 1;
    const randomId = Math.floor(Math.random() * 31);

    const [randomPlant, setRandomPlant] = useState("")

    useEffect(()=>{
        axios
        .get(`${apiURL}&page=${randomPage}`)
        .then((response)=>{
            setRandomPlant(response.data.data[`${randomId}`])
            console.log('Response for random plant is', response.data.data[`${randomId}`])
        })
        .catch(err=>console.log('Error accessing random plant', err))
    }
    ,[])
  return (
    <div className="home">
      { !isLoading && ( isLoggedIn && (
        
        <div className='header'>
          <div>
          {!isExpert && user && (<>
              <PlantCard plants={userToView.myPlants}/>
              <div>
            <h1>Get help with your plants</h1>
            <h5>Are you struggling with taking care of your plants? Planty experts are here to help you. Book a consultation service with one of Planty experts now!</h5>
            <Link to="/get-support"> <CtaButton cta="Book an expert" className="button-filled"/> </Link>
          </div>
          </>
            )}
          {user &&   <BookingCard bookings={userToView.bookings}/>
                }
          </div>
          {randomPlant && <PlantForInspiration randomPlant={randomPlant}/>}

        </div>
      )
      ) 
      
      }
      {/* {isLoading && <h1>Loading</h1>} */}
      {!isLoggedIn && <><GuestHomePage/> 
      {randomPlant && <PlantForInspiration randomPlant={randomPlant}/>}

      </>
      }
      
    </div>
  )
}

export default HomePage