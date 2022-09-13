import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [wdate, setWdate] = useState("");
  useEffect(() => {
    const getPlantById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/plants/${id}`
      );
      setPlant(response.data);
    };
    getPlantById();
  }, [id]);
  if (!plant) return <p>Loading...</p>;

  const latest_watering = new Date(plant.waterings[0]?.date);
  const n_days_passed = parseInt(
    (new Date() - latest_watering) / (1000 * 60 * 60 * 24),
    10
  );

  const handeSubmit = async () => {
    if (wdate === "") {
      alert("⚠️ please select a date! ");
    }
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/plants/water/${id}`,
      {
        date: new Date(wdate)
      }
    );
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/plants/${id}`
    );
    setPlant(response.data);
    setWdate("");
  };

  return (
    <div>
      <h2>Plant details {id} </h2>
      <h4>{plant.name}</h4>
      <img className="plant-picture" src={plant.image} alt="plant" />
      <div>
        <p>Last water: {latest_watering.toDateString()}</p>
        {plant.waterings.length > 0 ? (
          <div>
            <h5>Waterings:</h5>
            <ul>
              {plant.waterings.map((w) => (
                <li key={w.id}>{new Date(w.date).toDateString()}</li>
              ))}
            </ul>
            <p>
              {n_days_passed} days since last watering{" "}
              {n_days_passed < plant.interval ? "👍" : "⚠️"}
            </p>
          </div>
        ) : (
          <div>
            <p>Not watered yet! ⚠️</p>
          </div>
        )}
        <div>
          <input
            type="date"
            value={wdate}
            onChange={(e) => setWdate(e.target.value)}
          />
          <button onClick={() => handeSubmit()}>Register watering</button>
        </div>
      </div>
      <NavLink to="/">Back home</NavLink>
    </div>
  );
};

export default DetailPage;
