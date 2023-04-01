
import React from 'react'
import AddPlantForm from '../../components/AddPlantForm'
// import SearchApiPlant from '../components/SearchApiPlant'
// import ShowPlantFromAPI from '../components/ShowPlantFromAPI'


function AddPlant() {
  // const [searchPlants, setSearchPlants] = useState([])

  // const addPlants = (plantsToShow) => {
  //   const showPlants = [plantsToShow, ...searchPlants]
  //   setSearchPlants(showPlants)
  // }
  
  return (
    <div>
    
    <h1>AddPlant</h1>
    {/* <ShowPlantFromAPI/> */}
    {/* <SearchApiPlant/> */}
    <AddPlantForm/>
    
    </div>
  )
}

export default AddPlant