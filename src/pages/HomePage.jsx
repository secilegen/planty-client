import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import PlantForInspiration from '../components/PlantForInspiration';
 

function HomePage() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext)
  return (
    <div>

      {isLoggedIn && (
        <div>
          <div>
          <h1>My Plants</h1>
          {/* Insert plant cards here */}
          </div>
          <div>
            <h1>Get help with your plants</h1>
            <h5>Are you struggling with taking care of your plants? Planty experts are here to help you. Book a consultation service with one of Planty experts now!</h5>
            <Link to="/get-support"> <button>Book an expert</button> </Link>
          </div>
        <PlantForInspiration/>
        </div>
      )}
      {!isLoggedIn && (
        <div>
        <h1>Happy plants, happy homes</h1>
        <h5>We know how hard it can get to keep your plants alive. Planty is here to support you with caring tips and more to make your plants happy
        </h5>
        <Link to="/signup"> <button>Create an account</button> </Link>
        <Link to="/login"> <button>Login</button> </Link>
        <div>
          <h1>Are you a plant expert?</h1>
          <h5>Planty is a community where plant owners meet experts to get caring tips & tricks in person or online</h5>
          <Link to="/signup-expert"> <button>Sign up as Planty expert</button> </Link>
          </div>
          </div>
      )}
      

    </div>
  )
}

export default HomePage