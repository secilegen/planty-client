import React from 'react'
import { Link } from "react-router-dom";

function NavbarGuest() {
  return (
    <div className='navbar-right'>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </div>
  )
}

export default NavbarGuest