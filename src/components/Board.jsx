import { useState } from "react";
import { Container } from "@mui/material";
import Cell from "./Cell";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Board = ({ setGameOver, turns, setTurns, onProgress, nubmerOfTurns, setNubmerOfTurns, shuffledCards, setShuffledCards, timerOn, setTimerOn }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const TILE_SIZE = isMediumScreen ? 50 : 100;
  const GRID_SIZE_X = 5;
  const GRID_SIZE_Y = 4;
  const GRID_GAP = isMediumScreen ? 5 : 10;
  const totalWidth = GRID_SIZE_X * TILE_SIZE + (GRID_SIZE_X - 1) * GRID_GAP;
  const totalHeight = GRID_SIZE_Y * TILE_SIZE + (GRID_SIZE_Y - 1) * GRID_GAP;

  const handleCardClick = (card) => {
    //Start timer on a first card click
    if (!timerOn) {
      setTimerOn(true);
    }
    // Prevent flipping more than two cards at once
    if (flippedCards.length === 2) {
      return;
    }
    //If card is flipped it's not clickable
    if (card.match) return;
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

          if (allFlipped) {
            setGameOver(true);
            setTimerOn(false);
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
          gridTemplateColumns: `repeat(${GRID_SIZE_X}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE_Y}, ${TILE_SIZE}px)`,
          gridGap: `${GRID_GAP}px`,
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
        }}
      >
        {shuffledCards.map((card) => (
          <div>
            <Cell card={card} onCellClick={handleCardClick} tileSize={TILE_SIZE} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Board;
