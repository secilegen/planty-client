import React from 'react'
import { Link, useParams } from 'react-router-dom'

function ExpertDetailsPage(props) {
    const {expertId} = useParams()
  return (
    <div>
        
        <h3>Your Profile</h3>
        <Link to={"/expert/:expertId/edit"}  >
        <button>Edit Profile</button>
        </Link>

    </div>
  )
}

export default ExpertDetailsPage