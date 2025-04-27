import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceGrid.css";
import hajfestesImg from "./ServiceImages/hajfestes.jpg";
import hajvagasImg from "./ServiceImages/hajvagas.jpg";
import gyantazasImg from "./ServiceImages/gyantazas.jpg";
import pedikurImg from "./ServiceImages/pedikur.jpg";
import manikurImg from "./ServiceImages/manikur.jpg";
import koromfestesImg from "./ServiceImages/koromfestes.jpg";
import masszazsImg from "./ServiceImages/masszazs.jpg";
import arckezelesImg from "./ServiceImages/arckezeles.jpg";
const services = [
  { id: 1, name: "Hajfestés", image: hajfestesImg },
  { id: 2, name: "Hajvágás", image: hajvagasImg },
  { id: 3, name: "Manikűr", image: manikurImg },
  { id: 4, name: "Körömfestés", image: koromfestesImg },
  { id: 5, name: "Pedikűr", image: pedikurImg },
  { id: 6, name: "Masszázs", image: masszazsImg },
  { id: 7, name: "Arckezelés", image: arckezelesImg },
  { id: 8, name: "Gyantázás", image: gyantazasImg },
];

function ServiceGrid() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/foglalas/${id}`);
  };

  return (
    <div className="servicecontainer">
    <div className="service-grid">
      {services.map((service) => (
        <div
          key={service.id}
          className="service-card"
          onClick={() => handleClick(service.id)}
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="overlay" />
          <div className="text">{service.name}</div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default ServiceGrid;

