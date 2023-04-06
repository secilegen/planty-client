import './App.css';

// import { Route } from 'react-router';
// import { BrowserRouter as Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddUser from "./pages/AddUser";
import AddPlant from "./pages/AddPlant";
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';
import EditPlant from './pages/EditPlant';
import PlantDetails from './pages/PlantDetails';
import BookingDetails from './pages/BookingDetails';
import ExpertSignupPage from './pages/ExpertSignupPage';
import ExpertLoginPage from './pages/ExpertLoginPage';
import ExpertPage from './pages/ExpertDetailsPage';
import EditExpertPage from './pages/EditExpertPage';
import UserProfilePage from './pages/UserProfilePage';
import ExpertProfilePage from './pages/ExpertProfilePage';
import ExpertDetailsPage from './pages/ExpertDetailsPage';
import EditUserPage from './pages/EditUserPage';
import AddDisease from './components/AddDisease';



function App() {
  return (

    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<AddUser/>}/>
        <Route path="/profile" element={<UserProfilePage/>}/>
        <Route path="/profile/edit" element={<EditUserPage/>}/>
        <Route path="/plants" element={<AddPlant/>}/>
        <Route path="/plants/:plantId" element={<IsPrivate><PlantDetails/></IsPrivate>}/>
        <Route path="/plants/edit/:plantId" element={<IsPrivate><EditPlant/></IsPrivate>}/>
        <Route path="/get-support" element={<AddBooking/>}/>
        <Route path="/get-support/:id" element={<IsPrivate><BookingDetails/></IsPrivate>}/>
        <Route path="/get-support/edit/:id" element={<IsPrivate><EditBooking/></IsPrivate>}/>
        <Route path='/expert/signup' element={<ExpertSignupPage/>}/>
        <Route path='/expert/login' element={<ExpertLoginPage/>}/>
        <Route path='/expert/:expertId' element={<ExpertProfilePage/>}/>
        <Route path='/expert/:expertId/edit' element={<EditExpertPage/>}/>
        <Route path='/expert-details/:expertId' element={<ExpertDetailsPage/>}/>
        <Route path="/disease/:plantId" element={<AddDisease/>}/>



      </Routes>

    </div>
  );
}

export default App;
