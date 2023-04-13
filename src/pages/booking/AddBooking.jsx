import React, { useState } from 'react'
import AddBookingForm from '../../components/AddBookingForm'
import BookingSelection from './BookingSelection'

function AddBooking() {

  const [selectedExpert, setSelectedExpert] = useState('')
  

  const selectExpert = (id) =>{
    setSelectedExpert(id)
    console.log("select expert", id)
  }
  return (
    <div>
    <h1 className="detailHeadline">Book an expert</h1>
    <BookingSelection selectExpert={selectExpert}/>
    <AddBookingForm expert={selectedExpert}/>
    </div>
  )
}

export default AddBooking