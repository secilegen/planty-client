import React from 'react'
import { Link } from "react-router-dom";
import PlantForInspiration from '../components/PlantForInspiration';
import Header from '../images/Header.png'
import CtaButton from '../components/CtaButton';
 

function GuestHomePage() {
  return (
    <div className="guest-home">
      <div className="header">
        <img src={Header} className="header-image" />
        <div className="header-info">
          <h1>Happy plants,<br/> happy homes</h1>
          <h5 className='homeContent'>
            We know how hard it can get to keep your plants alive. Planty is
            here to support you with caring tips and more to make your plants
            happy
          </h5>
          <Link to="/signup">
            
            <CtaButton cta="Create an account" className="button-filled" />{" "}
          </Link>
          <Link to="/login">
            {" "}
            <CtaButton cta="Login" className="button-framed" />{" "}
          </Link>
        </div>
      </div>
      <div className="home-expert">
        {/* <img src={Body} className='home-expert-image'/> */}

        <div className="home-expert-text">
          <h1>Are you a plant expert?</h1>
          <h5>
            Planty is a community where plant owners meet experts to get caring
            tips & tricks in person or online
          </h5>
        </div>
        <div>
          {" "}
          <Link to="/expert/signup">
            {" "}
            <CtaButton
              cta="Become a Planty expert"
              className="button-framed"
            />{" "}
          </Link>
        </div>
      </div>
     
    </div>
  );
}

export default GuestHomePage;
