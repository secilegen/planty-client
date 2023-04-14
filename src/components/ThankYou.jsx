import React from 'react'
import thankYou from "../images/thankYou.png"

function ThankYou() {
  return (
    <div>
    <h1 className='thankYou'>Thank You!</h1>
    <img className="thankYouImg" src={thankYou} alt="thankYou"/>
    
    </div>
  )
}

export default ThankYou