import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter as Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
