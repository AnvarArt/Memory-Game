import React, { useState, useEffect } from "react";
import Board from "./components/Board.jsx";
import Card from "./components/Card.jsx";
import PlayerInfo from "./components/PlayerInfo.jsx";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", matches: 0 },
    { id: 2, name: "Player 2", matches: 0 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turns, setTurns] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleCardClick = (cardId) => {
    // Implement card flipping logic here
  };

  const startNewGame = () => {
    // Implement logic to reset game state and start a new game
  };

  useEffect(() => {
    if (gameStarted && isGameOver) {
      // Implement logic to update player matches and switch turns
    }
  }, [isGameOver]);

  return (
    <div className='app'>
      <PlayerInfo player={players[0]} isCurrent={currentPlayerIndex === 0} />
      <Board onCardClick={handleCardClick} />
      <PlayerInfo player={players[1]} isCurrent={currentPlayerIndex === 1} />
      <button onClick={startNewGame}>Start New Game</button>
    </div>
  );
};

export default App;
