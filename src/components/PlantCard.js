import { NavLink } from "react-router-dom";

const PlantCard = ({ plant }) => {
  const latest_watering = new Date(plant.waterings[0]?.date);
  const n_days_passed = parseInt(
    (new Date() - latest_watering) / (1000 * 60 * 60 * 24),
    10
  );
  return (
    <div className="plant-card">
      <div>
        <h4>{plant.name}</h4>
        <img className="plant-picture" src={plant.image} alt="plant" />
      </div>
      <div>
        {plant.waterings.length > 0 ? (
          <div>
            <p>Last water: {latest_watering.toDateString()}</p>
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
      </div>
      <NavLink to={`/plant/${plant.id}`}>See details</NavLink>
    </div>
  );
};

export default PlantCard;
