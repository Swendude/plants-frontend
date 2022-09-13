import { useEffect, useState } from "react";
import axios from "axios";
import PlantCard from "../components/PlantCard";

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    const getPlants = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/plants`
      );
      setPlants(response.data);
    };
    getPlants();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default HomePage;
