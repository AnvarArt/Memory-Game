import { useState } from "react";
import { Grid, Container } from "@mui/material";
import "./App.css";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  console.log("gameOver: ", gameOver);
  return (
    <div>
      <Board setGameOver={setGameOver} />
      <PlayerInfo></PlayerInfo>
    </div>
  );
};

export default App;
