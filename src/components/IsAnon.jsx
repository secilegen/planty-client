import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { TailSpin } from  'react-loader-spinner'

 
function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if (isLoading) return <p>Loading ...</p>;
   if (isLoading) return <TailSpin
  height="80"
  width="80"
  color="#084d26"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  alignSelf="center"
/>;
 
  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
 
export default IsAnon;