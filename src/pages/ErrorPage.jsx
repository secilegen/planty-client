import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h1>Page not found</h1>
        <iframe src="https://giphy.com/embed/H1pQNyDaN89uW045hB" width="480" height="403" frameBorder="0" className="giphy-embed" allowFullScreen>
        </iframe>
        <p>
            <a href="https://giphy.com/gifs/sad-plant-dying-H1pQNyDaN89uW045hB">via GIPHY
            </a>
        </p>
        <Link to="/">
            <button>
            Go back to home page
            </button>
            </Link>
    </div>
  )
}

export default ErrorPage