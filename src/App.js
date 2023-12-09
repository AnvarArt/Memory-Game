import { useState, useEffect, useRef } from "react";
import { Grid, Container, Stack, Typography, Button } from "@mui/material";
import "./App.css";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";
import { cards } from "./config/card-config.js";
import { shuffleBoard } from "./utils/board.helper.js";

const App = () => {
  const [gameOver, setGameOver] = useState(false);
  console.log("gameOver: ", gameOver);
  const [playerOne, setPlayerOne] = useState("Player 1");
  const [playerTwo, setPlayerTwo] = useState("Player 2");
  const [winner, setWinner] = useState("");
  const [shuffledCards, setShuffledCards] = useState(shuffleBoard(cards));
  //will be saved in localqstorage
  const isMounted = useRef(false);

  //Tracking the progress of the game
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });
  const [matches, setMatches] = useState({ playerOne: 0, playerTwo: 0 });
  const [turns, setTurns] = useState(true);

  //Number of turns
  const [nubmerOfTurns, setNubmerOfTurns] = useState(0);

  useEffect(() => {
    if (gameOver) {
      if (matches.playerOne > matches.playerTwo) {
        setScore({ ...score, playerOne: score.playerOne + 1 });
        setWinner(playerOne);
      } else if (matches.playerOne < matches.playerTwo) {
        setScore({ ...score, playerTwo: score.playerTwo + 1 });
        setWinner(playerTwo);
      }
    }
  }, [gameOver]);

  //Restart button
  const clickRestart = () => {
    setShuffledCards(shuffleBoard(cards));
    setMatches({ playerOne: 0, playerTwo: 0 });
    setTurns(true);
    setGameOver(false);
    setNubmerOfTurns(0);
  };

  const onProgress = (match) => {
    console.log("onProgress: ", match);
    setNubmerOfTurns(nubmerOfTurns + 1);
    console.log("onProgress: ", nubmerOfTurns);
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

  //Get from Local Storage
  useEffect(() => {
    const storedScore = localStorage.getItem("matchGame");
    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, []);

  // Set to Local Storage
  useEffect(() => {
    //we need to skip setting to local storage on a first run
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    localStorage.setItem("matchGame", JSON.stringify(score));
  }, [score]);

  return (
    <Container maxWidth='xl' style={{ textAlign: "center" }}>
      <Typography variant='h3' style={{ marginBottom: "2rem" }}>
        Memory Game
      </Typography>
      <Typography variant='h5' style={{ marginBottom: "1rem" }}>
        Turns:{nubmerOfTurns}
      </Typography>
      <Stack direction='row' style={{ marginBottom: "2rem" }}>
        <PlayerInfo player={playerOne} matches={matches.playerOne} />
        <Board setGameOver={setGameOver} turns={turns} onProgress={onProgress} setTurns={setTurns} nubmerOfTurns={nubmerOfTurns} setNubmerOfTurns={setNubmerOfTurns} setShuffledCards={setShuffledCards} shuffledCards={shuffledCards} />
        <PlayerInfo player={playerTwo} matches={matches.playerTwo} />
      </Stack>
      <Typography variant='h5' sx={{ textAlign: "center" }}>{`Total Score: Player1: ${score.playerOne} Player2: ${score.playerTwo}`}</Typography>
      {gameOver && (
        <>
          <Button variant='outline' onClick={clickRestart}>
            Restart
          </Button>
          <Typography>{winner === "" ? "Draw" : `Winner ${winner}`}</Typography>
        </>
      )}
    </Container>
  );
};

export default App;
