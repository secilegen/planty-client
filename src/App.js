import './App.css';

// import { Route } from 'react-router';
// import { BrowserRouter as Routes } from 'react-router-dom';
import SignupPage from './pages/user/SignupPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/user/LoginPage';
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPlant from "./pages/plant/AddPlant";
import AddBooking from './pages/booking/AddBooking';
import EditBooking from './pages/booking/EditBooking';
import EditPlant from './pages/plant/EditPlant';
import PlantDetails from './pages/plant/PlantDetails';
import BookingDetails from './pages/booking/BookingDetails';
import ExpertSignupPage from './pages/ExpertSignupPage';
import ExpertLoginPage from './pages/ExpertLoginPage';
import ExpertPage from './pages/ExpertDetailsPage';
import EditExpertPage from './pages/EditExpertPage';
import UserProfilePage from './pages/user/UserProfilePage';
import ExpertProfilePage from './pages/ExpertProfilePage';
import ExpertDetailsPage from './pages/ExpertDetailsPage';
import EditUserPage from './pages/user/EditUserPage';
import ErrorPage from './pages/ErrorPage';


function App() {
  return (

    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<IsPrivate><UserProfilePage/></IsPrivate>}/>
        <Route path="/profile/edit" element={<IsPrivate><EditUserPage/></IsPrivate>}/>
        <Route path="/plants" element={<IsPrivate><AddPlant/></IsPrivate>}/>
        <Route path="/plants/:plantId" element={<IsPrivate><PlantDetails/></IsPrivate>}/>
        <Route path="/plants/edit/:plantId" element={<IsPrivate><EditPlant/></IsPrivate>}/>
        <Route path="/get-support" element={<IsPrivate><AddBooking/></IsPrivate>}/>
        <Route path="/get-support/:id" element={<IsPrivate><BookingDetails/></IsPrivate>}/>
        <Route path="/get-support/edit/:id" element={<IsPrivate><EditBooking/></IsPrivate>}/>
        <Route path='/expert/signup' element={<IsAnon><ExpertSignupPage/></IsAnon>}/>
        <Route path='/expert/login' element={<IsAnon><ExpertLoginPage/></IsAnon>}/>
        <Route path='/expert/:expertId' element={<ExpertProfilePage/>}/>
        <Route path='/expert/:expertId/edit' element={<EditExpertPage/>}/>
        <Route path='/expert-details/:expertId' element={<ExpertDetailsPage/>}/>
        <Route path="*" element={ <ErrorPage /> } />



      </Routes>

    </div>
  );
}

export default App;
