import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
 
function Navbar() {
  
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);   
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
 
      {isLoggedIn && (
        <div>
            {/* profile page yet to be created */}
          <Link to="/profile">
            <button>Profile</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>

        </div>
      )}
 
      {!isLoggedIn && (
        <div>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </div>
      )}
    </nav>
  );
}
 
export default Navbar;