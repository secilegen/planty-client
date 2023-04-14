import React from 'react'
import { Link } from 'react-router-dom'
import linkedIn from "../images/linkedIn.png"
import ThankYou from './ThankYou'
import monstera from "../images/monsteraIcon.png"

function Footer() {
  return (
    <div className='footer'>
        {/* <Link to="https://www.linkedin.com/in/secilegen/">
        <p>// Secil Egen</p>
        </Link>
        <Link to="">
        <p>// Nadine Machmeier</p>
        </Link> */}

<p>Planty created by</p>
        <div className='footerText'>
        <p className='footerLeft'> Secil Egen </p>
        <Link to="https://www.linkedin.com/in/secilegen/">
        <img src={linkedIn} alt="linkedin" className='LinkedInImg'/>
        </Link>

       <p className='footerRight'> & Nadine Machmeier</p>
       <Link to="https://www.linkedin.com/in/nadine-machmeier/">
        <img src={linkedIn} alt="linkedin" className='LinkedInImg'/>
        </Link>
        

        <Link to="/profile/about">
        <img src={monstera} alt="monstera" className='monstera'/>
        </Link>

        </div>
        </div>

   
  )
}

export default Footer