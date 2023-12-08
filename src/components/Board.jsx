import { useState } from "react";
import { Container } from "@mui/material";
import Cell from "./Cell";
import { cards } from "../config/card-config.js";
import { shuffleBoard } from "../utils/board.helper.js";

const Board = ({ setGameOver, turns, setTurns, onProgress }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  // const [matches, setMatches] = useState([]);
  const [shuffledCards, setShuffledCards] = useState(shuffleBoard(cards));

  // const shuffledCards = shuffleBoard(cards);
  // const shuffledCards = cards;

  console.log({ shuffledCards });
  console.log({ flippedCards });

  const handleCardClick = (card) => {
    // Prevent flipping more than two cards at once
    if (flippedCards.length === 2) {
      return;
    }
    if (flippedCards.some((item) => item.id === card.id)) {
      return;
    }

    // Flip the clicked card
    const newCards = shuffledCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setShuffledCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const match = newFlippedCards[0].name === newFlippedCards[1].name;
      onProgress(match);
      if (match) {
        //console.log("Match!");

        // Remove matched cards
        //added setTimeout to allow user to see matched cards before they are removed (marked green - found match)
        setTimeout(() => {
          const matchedCards = newCards.map((card) => {
            const isCardFlipped = newFlippedCards.some((flippedCard) => flippedCard.id === card.id);
            if (isCardFlipped) {
              //console.log("Match found!");
              return { ...card, match: true };
            } else {
              return card;
            }
          });
          setShuffledCards(matchedCards);

          const allFlipped = matchedCards.every((item) => item.match);

          console.log({ allFlipped });
          console.log({ matchedCards });

          if (allFlipped) {
            setGameOver(true);
            console.log("gameOver");
          }
        }, 1000);
      }

      // Reset flipped cards after a short delay
      setTimeout(() => {
        setFlippedCards([]);
        // Flip cards back if not matched
        if (!match) {
          const resetCards = shuffledCards.map((c) => ({ ...c, isFlipped: false }));
          setShuffledCards(resetCards);
        }
      }, 1000);
    }
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, 1fr)`,
          gridTemplateRows: `repeat(4, 1fr)`,
          gridGap: "10px",
          // width: `100px",
          // height: "150px",
          // width: `${GRID_SIZE * TILE_SIZE}px`,
          // height: `${GRID_SIZE * TILE_SIZE}px`,
        }}
      >
        {shuffledCards.map((card) => (
          <div key={card.id} style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid black" }}>
            <Cell card={card} onCellClick={handleCardClick} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Board;
