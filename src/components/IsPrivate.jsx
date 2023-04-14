import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { TailSpin} from "react-loader-spinner";
 
function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);
 

  if (isLoading) return <TailSpin
  height="80"
  width="80"
  color="#084d26"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>;
 
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
 
export default IsPrivate;