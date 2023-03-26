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
import UserPage from "./pages/UserPage";
import AddUser from "./pages/AddUser";
import AddPlant from "./pages/AddPlant";
import AddBooking from './pages/AddBooking';


function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
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
