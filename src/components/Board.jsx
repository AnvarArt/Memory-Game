import React, { useState, useEffect } from "react";
import Card from "./Card";
//import "./Board.css";

const Board = ({ onCardClick }) => {
  const [cards, setCards] = useState([]); // Implement logic to generate shuffled cards

  useEffect(() => {
    // Implement logic to shuffle and set initial state of cards
  }, []);

  return (
    <div className='board'>
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
};

export default Board;
