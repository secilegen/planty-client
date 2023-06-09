import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_API_URL
  // withCredentials: true // => you might need this option if using cookies and sessions
});
 
const errorHandler = (err) => {
  throw err;
};
 
// PLANTS
const getPlants = () => {
  return api.get("/plants")
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
  return api.post("/api/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};
 
const createPlants = (newPlant) => {
  return api.post("/plants", newPlant)
    .then(res => res.data)
    .catch(errorHandler);
};

// USER

const getUser = () => {
  return api.get("/user/:id")
    .then((res) => res.data)
    .catch(errorHandler);
};
 
 
const createUser = (newUser) => {
  return api.post("/user", newUser)
    .then(res => res.data)
    .catch(errorHandler);

 }

 //EXPERT

 const getExpert = () => {
  return api.get("/expert/:id")
    .then((res) => res.data)
    .catch(errorHandler);
};
 
 
const createExpert = (newExpert) => {
  return api.post("/expert", newExpert)
    .then(res => res.data)
    .catch(errorHandler);

 }


 
export default {
  getPlants,
  uploadImage,
  createPlants,
  getUser,
  createUser,
  getExpert,
  createExpert
}