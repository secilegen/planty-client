import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiURL = "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";
// https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237&page=12

function PlantForInspiration(props) {

    // const randomPage = Math.floor(Math.random() * 200) + 1;
    // const randomId = Math.floor(Math.random() * 31);

    // const [randomPlant, setRandomPlant] = useState("")

    // useEffect(()=>{
    //     axios
    //     .get(`${apiURL}&page=${randomPage}`)
    //     .then((response)=>{
    //         setRandomPlant(response.data.data[`${randomId}`])
    //         console.log('Response for random plant is', response.data.data[`${randomId}`])
    //     })
    //     .catch(err=>console.log('Error accessing random plant', err))
    // }
    // ,[])
  return ( <div> 
    {props.randomPlant.default_image.small_url && (
    <div>
      <h2>Planty Inspiration</h2>
        <img src={props.randomPlant.default_image.small_url}/>
        <h1>{props.randomPlant.common_name}</h1>
        <h3>"{props.randomPlant.scientific_name}"</h3>
        {/* Sunlight needs to be mapped or filtered, come back later */}
        <h3>{props.randomPlant.sunlight[1]}</h3>
        <h3>{props.randomPlant.watering}</h3>
        </div>
   ) 
   } 
  </div>)
}

export default PlantForInspiration