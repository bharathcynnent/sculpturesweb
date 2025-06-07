import React from "react";
import "../csscomponents/TopSculptures.css";
import topSculp1 from "..//assets/topsculp1.png";
import topSculp2 from "..//assets/topsculp2.png";
import topSculp3 from "..//assets/topsculp3.jpg";

const sculptures = [
  {
    title: "Stone Sculpture",
    description:
      "Stone sculpture is a piece of art carved or shaped from natural stone, such as granite, limestone, or sandstone. These sculptures are durable and have been used for centuries to create monuments, religious icons",
    img: topSculp1,
    reverse: false,
  },
  {
    title: "Marble Sculpture",
    description:
      "Marble sculpture is a three-dimensional artwork carved from marble, known for its smooth finish and ability to hold fine details. Used since ancient times, marble sculptures are valued for their beauty, durability architecture.",
    img: topSculp2,
    reverse: true,
  },
  {
    title: "Black Marble",
    description:
      "Black marble sculpture is a carved artwork made from black marble, a dense and polished stone known for its deep, rich color and subtle veining. These sculptures offer a striking and elegant appearance, often used in modern art.",
    img: topSculp3,
    reverse: false,
  },
];

export default function TopSculptures({ onNavigate }) {
  return (
    <div className="sculpture-page">
      <h1 className="heading">Top Sculptures</h1>
      {sculptures.map((item, index) => (
        <div
          className={`sculpture-section ${item.reverse ? "reverse" : ""}`}
          key={index}
        >
          <img src={item.img} alt={item.title} className="sculpture-image" />
          <div className="sculpture-content">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button className="view-more" onClick={() => onNavigate['Shop']()}>View more</button>
          </div>
        </div>
      ))}
    </div>
  );
}