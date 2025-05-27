import React from "react";
import "../csscomponents/TopSculptures.css";

const sculptures = [
  {
    title: "Stone Sculpture",
    description:
      "Stone sculpture is a piece of art carved or shaped from natural stone, such as granite, limestone, or sandstone. These sculptures are durable and have been used for centuries to create monuments, religious icons",
    img: "../../public/assets/topsculp1.png",
    reverse: false,
  },
  {
    title: "Marble Sculpture",
    description:
      "Marble sculpture is a three-dimensional artwork carved from marble, known for its smooth finish and ability to hold fine details. Used since ancient times, marble sculptures are valued for their beauty, durability architecture.",
    img: "../../public/assets/topsculp2.png",
    reverse: true,
  },
  {
    title: "Black Marble",
    description:
      "Black marble sculpture is a carved artwork made from black marble, a dense and polished stone known for its deep, rich color and subtle veining. These sculptures offer a striking and elegant appearance, often used in modern art.",
    img: "../../public/assets/topsculp3.jpg",
    reverse: false,
  },
];

export default function TopSculptures() {
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
            <button className="view-more">View more</button>
          </div>
        </div>
      ))}
    </div>
  );
}


