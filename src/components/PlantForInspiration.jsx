import React, { useEffect, useState } from 'react'
import axios from 'axios'
import sunIcon from "../images/sunIconBlack.png"
import waterIcon from "../images/wateringIconBlack.png"
import leafIcon from "../images/leaf-icon.png"

const apiURL = "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";
// https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237&page=12

function PlantForInspiration(props) {
  function capitalize(str) {
    const lowerCaseString = str.toLowerCase(), 
          firstLetter = str.charAt(0).toUpperCase(), 
          strWithoutFirstChar = lowerCaseString.slice(1);
  
    return firstLetter + strWithoutFirstChar; 
  
  }
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
      <div className='inspirationHeader'>
      <img src={leafIcon} alt="leaf"/>
      <h1 >Planty Inspiration</h1>

      </div>
      <div  className='inspirationCard'>
        <img src={props.randomPlant.default_image.small_url} className="inspirationImg"/>
        <h2 className='inspirationCommon'>{capitalize(props.randomPlant.common_name)}</h2>
        <p className='inspirationSci'>"{props.randomPlant.scientific_name}"</p>
        {/* Sunlight needs to be mapped or filtered, come back later */}

        <div className='inspirationRow'>
        <img src={sunIcon} alt="sun" className="plantDetailIcon"/>
        <p className='inspirationContent'>{capitalize(props.randomPlant.sunlight[1])}</p>
        </div>
        <div className='inspirationRow'>
        <img src={waterIcon} alt="sun"className="plantDetailIcon"/>
        <p className='inspirationContent'>{props.randomPlant.watering}</p>
        </div>
        </div>
        </div>
   ) 
   } 
  </div>)
}

export default PlantForInspiration