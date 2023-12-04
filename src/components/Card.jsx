import React from "react";
//import "./Card.css";

const Card = ({ id, symbol, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => onClick(id)}>
      {isFlipped && <img src={`images/${symbol}.png`} alt={symbol} />}
    </div>
  );
};

export default Card;
