import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import PlantForInspiration from '../components/PlantForInspiration';
import Header from '../images/Header.png'
import Body from '../images/Body.jpg'
import CtaButton from '../components/CtaButton';
import Footer from '../components/Footer';
 

function HomePage() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
  return (
    <div>

      {isLoggedIn && (
        <div className='header'>
          <div>
          <h1>My Plants</h1>
          {/* Insert plant cards here */}
          </div>
          <div>
            <h1>Get help with your plants</h1>
            <h5>Are you struggling with taking care of your plants? Planty experts are here to help you. Book a consultation service with one of Planty experts now!</h5>
            <Link to="/get-support"> <CtaButton cta="Book an expert" className="button-filled"/> </Link>
          </div>
        {/* <PlantForInspiration/> */}
        </div>
      )}
      {!isLoggedIn && (
        <div className='home'>
        <div className='header'>
          <img src={Header} className='header-image'/>
          <div className='header-info'>
        <h1>Happy plants, happy homes</h1>
        <h5>We know how hard it can get to keep your plants alive. Planty is here to support you with caring tips and more to make your plants happy
        </h5>
        <Link to="/signup" > <CtaButton cta="Create an account" className="button-filled"/> </Link>
        <Link to="/login"> <CtaButton cta="Login" className="button-framed"/> </Link>
        </div>
        </div>
        <div className='home-expert'>
        {/* <img src={Body} className='home-expert-image'/> */}
         
         <div className='home-expert-text'> 
         <h1>Are you a plant expert?</h1>
          <h5>Planty is a community where plant owners meet experts to get caring tips & tricks in person or online</h5>
          </div>
          <div>  <Link to="/expert/signup"> <CtaButton cta="Become a Planty expert" className="button-framed"/> </Link>
</div>
          </div>
          <Footer/>
          </div>
      )}
      
    </div>
  )
}

export default HomePage