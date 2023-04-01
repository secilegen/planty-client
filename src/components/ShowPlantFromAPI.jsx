import { useState, useEffect } from "react";
import axios from "axios";

const apiURL =
  "https://perenual.com/api/species-list?page=1&key=sk-FsHH64248ac18d2c8237&page=5";

function ShowPlantFromAPI() {
  const [fetching, setFetching] = useState(true);
  const [plant, setPlant] = useState([]);

  useEffect(() => {
    console.log("useEffect - initial render");
    axios
    .get(apiURL)
    .then((response) => {
      setPlant(response.data.data);
      setFetching(false);

      console.log("show api plants", response);
    });
  }, []);

  return (
    <div>
      <h3>API Plants</h3>
      {fetching && <p>Loading ...</p>}

      {plant.map((result) => {
        return (
          <div key={result.id} className="apiPlant">
            <p>{result.common_name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ShowPlantFromAPI;
