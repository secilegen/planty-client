import React from 'react'

function BookingCard(props) {

  return (
    <div>
    <h1>My Bookings</h1>

    <div>{props.bookings.map(oneBooking => {
        return (
            <div key={oneBooking._id}>
            <p>Reason: {oneBooking.reasonWhy}</p>
            <p>Description: {oneBooking.description}</p>
            <p>Location: {oneBooking.isOnline}</p>
            <p>Booking status: {oneBooking.isConfirmed}</p>
            <br/>

            </div>
            )
            
    })}

        </div>
    
    </div>
  )
}

export default BookingCard