import { useState, useEffect } from "react";
import { Grid, Container, Stack } from "@mui/material";
import "./App.css";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  console.log("gameOver: ", gameOver);
  const [playerOne, setPlayerOne] = useState("Player 1");
  const [playerTwo, setPlayerTwo] = useState("Player 2");

  //Tracking the progress of the game
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });
  const [matches, setMatches] = useState({ playerOne: 0, playerTwo: 0 });
  const [turns, setTurns] = useState(true);

  useEffect(() => {
    if (gameOver) {
      if (matches.playerOne > matches.playerTwo) {
        setScore({ ...score, playerOne: score.playerOne + 1 });
      } else if (matches.playerOne < matches.playerTwo) {
        setScore({ ...score, playerTwo: score.playerTwo + 1 });
      }
    }
  }, [gameOver]);

  const onProgress = (match) => {
    console.log("onProgress: ", match);
    if (!match) return;
    if (turns) {
      setMatches({ ...matches, playerOne: matches.playerOne + 1 });
    } else {
      setMatches({ ...matches, playerTwo: matches.playerTwo + 1 });
    }
    //Changing Player's turns
    if (turns) {
      setTurns(false);
    } else setTurns(true);
  };
  return (
    <Stack direction='row'>
      <PlayerInfo player={playerOne} matches={matches.playerOne} score={score.playerOne} />
      <Board setGameOver={setGameOver} turns={turns} onProgress={onProgress} setTurns={setTurns} />
      <PlayerInfo player={playerTwo} matches={matches.playerTwo} score={score.playerTwo} />
    </Stack>
  );
};

export default App;
