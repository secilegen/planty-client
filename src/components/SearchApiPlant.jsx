import { useState, useEffect } from "react";
import axios from "axios";

const apiURL = "https://perenual.com/api/species-list?key=sk-9XCm64257488f0aa2237";



function SearchApiPlant(props) {
  const [fetching, setFetching] = useState(true);
  const [plant, setPlant] = useState([]);
  const [query, setQuery] = useState("");
//   const [searchParam] = useState(["common_name"]);



  useEffect(() => {
    console.log("useEffect - initial render");
    if (query !== "") {

    axios.get(apiURL, {params:{q:query}}).then((response) => {
      setPlant(response.data.data);
      setFetching(false);

      console.log("show api plants", response);
      console.log("query", query)
      console.log("plants", plant.length)
    })
    
    .catch(error => {
        console.log("Error calling API" + error)
    })

    
  } else if (query === "") {
    setPlant([])
  }
    

}, [query]);



//     function search(result) {

//     return plant.filter((item) => {
//       return searchParam.some((newItem) => {
//           return (
//               item[newItem]
//                   .toString()
//                   .toLowerCase()
//                   .indexOf(query.toLowerCase()) > -1
//           );
//       });
//   });
//   }

  return (
    <div>
      {fetching && <p>Loading ...</p>}

      <label>Search Plant</label>
      <input
        value={query}
        type="search"
        placeholder="search for plant names"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {/* {search(plant).map((result) => { */}

      {plant.map((result) => {
        return (
          <div key={result.id} className="apiPlant">
          <img src={result.default_image.thumbnail} alt="plant"/>
         <p> {result.common_name}</p>
         <p>{result.scientific_name}</p>
         <button>select</button>
        
         </div>
        );
      })}
      
    </div>
  );
}

export default SearchApiPlant;
