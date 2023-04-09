import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='ErrorPage'>
        <h1>Page not found</h1>
        <iframe src="https://giphy.com/embed/H1pQNyDaN89uW045hB"  width="360" height="303"className="giphy-embed" frameBorder="0" allowFullScreen>
        </iframe>
        <p>
            <a href="https://giphy.com/gifs/sad-plant-dying-H1pQNyDaN89uW045hB">via GIPHY
            </a>
        </p>
        <div className="submit-button">
        <Link to="/">
            <button className="small-button button-filled-green">
            Go back to home page
            </button>
            </Link>
            </div>
    </div>
  )
}

export default ErrorPage

