import React, { useEffect, useState } from 'react'
import axios from 'axios'
import sunIcon from "../images/sunIconBlack.png"
import waterIcon from "../images/wateringIconBlack.png"

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
    <div className='inspiration'>
      <h2 className='inspirationHeader'>Your Planty Inspiration</h2>
      <div  className='inspirationCard'>
        <img src={props.randomPlant.default_image.small_url} className="inspirationImg"/>
        <h2 className='inspirationCommon'>{props.randomPlant.common_name}</h2>
        <p className='inspirationSci'>"{props.randomPlant.scientific_name}"</p>
        {/* Sunlight needs to be mapped or filtered, come back later */}

        <div className='inspirationRow'>
        <img src={sunIcon} alt="sun" className="plantDetailIcon"/>
        <p className='inspirationContent'>Sunlight Position: {props.randomPlant.sunlight[1]}</p>
        </div>
        <div className='inspirationRow'>
        <img src={waterIcon} alt="sun"className="plantDetailIcon"/>
        <p className='inspirationContent'>Watering: {props.randomPlant.watering}</p>
        </div>
        </div>
        </div>
   ) 
   } 
  </div>)
}

export default PlantForInspiration