import React from 'react'

function CtaButton(props) {
  return (
    <button className={"button " + props.className}>{props.cta}</button>
          
  )
}

export default CtaButton