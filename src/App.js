import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AddUser from "./pages/AddUser";
import AddPlant from "./pages/AddPlant";
import AddBooking from './pages/AddBooking';


function App() {
  return (
    <div className="App">

     <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<AddUser/>}/>
        <Route path="/user/:id" element={<UserPage/>}/>
        <Route path="/plants" element={<AddPlant/>}/>
        <Route path="/get-support" element={<AddBooking/>}/>
                
      </Routes> 

    </div>
  );
}

export default App;
