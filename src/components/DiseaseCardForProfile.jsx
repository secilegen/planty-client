import React from 'react'

function DiseaseCard(props) {

  return (

    <div>
    <h1>Disease</h1>

    <div>{props.disease.map(oneDisease => {
        return (
            <div key={oneDisease._id}>
            <img src={oneDisease.image} alt="disease" style={{width: "300px"}}/>
            <p>{oneDisease.name}</p>
            <br/>

            </div>
            )
            
    })}

        </div>

    </div>
  )
}

export default DiseaseCard