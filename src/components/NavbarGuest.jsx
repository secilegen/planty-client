import React from 'react'
import { Link } from "react-router-dom";

function NavbarGuest() {
  return (
    <div className='navbar-right navbar-right-bottom'>
          <Link to="/signup"> <button className="navbar-button">Sign Up</button> </Link>
          <Link to="/login"> <button className="navbar-button">Login</button> </Link>
        </div>
  )
}

export default NavbarGuest