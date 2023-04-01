import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 

const API_URL = "http://localhost:5005";


function EditUserPage() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isCompany, setIsCompany] = useState("")
    const [typeOfCompany, setTypeOfCompany] = useState("")
    const [companyName, setCompanyName] = useState("")

    const {userId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios
        .get(`${API_URL}/api/user/${user._id}`)
        .then((response)=>{
            const userToEdit = response.data
            setFirstName(userToEdit.firstName)
            setLastName(userToEdit.lastName)
            setIsCompany(userToEdit.isCompany)
            setCompanyName(userToEdit.companyName)
            setTypeOfCompany(userToEdit.setTypeOfCompany)
        })
        .catch((error)=> console.log("Error occured editing the user", error))
    }, [userId])

    const handleSubmit = (e) =>{
        e.preventDefault()
        const requestBody = {
            firstName,
            lastName,
            isCompany,
            companyName,
            typeOfCompany
        }
        axios.put(`${API_URL}/api/user/${user._id}`,requestBody)
        .then(response =>{
            console.log('Updated user info:', response)
            navigate(`/profile`)
        })
    }
  return (
    <div className='EditUserPage'>
        <h3>EditUserPage</h3>
        <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input 
            type="text" 
            name="firstName" 
            value={firstName} 
            onChange={(e)=> setFirstName(e.target.value)}
            />
        <label>Last Name</label>
        <input 
            type="text" 
            name="lastName" 
            value={lastName} 
            onChange={(e)=> setLastName(e.target.value)}
            />
        <label>Business User</label>
        <input 
            type="checkbox" 
            name="isCompany" 
            value={isCompany} 
            onChange={(e)=> setIsCompany(e.target.value)}
            />
        <label>Company Name</label>
        <input 
            type="text" 
            name="companyName" 
            value={companyName} 
            onChange={(e)=> setCompanyName(e.target.value)}
            />

        <label>Type of Company</label>
        <select id="" name="typeOfCompany" value={typeOfCompany} onChange={(e)=> setTypeOfCompany(e.target.value)}>
            <option value="Restaurant">Restaurant</option>
            <option value="Café">Café</option>
            <option value="Bar">Bar</option>
            <option value="Hotel">Hotel</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>

        </select>

        <button type="submit">Save Changes</button>
      </form>


        </div>
  )
}

export default EditUserPage