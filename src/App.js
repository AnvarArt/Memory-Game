import { useState, useEffect, useRef } from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";
import { cards } from "./config/card-config.js";
import { shuffleBoard } from "./utils/board.helper.js";
import { formatTime } from "./utils/helper.js";

const App = () => {
  // For responsive design, so the game can played on mobile devices
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [gameOver, setGameOver] = useState(false);
  const [playerOne, setPlayerOne] = useState("Player 1");
  const [playerTwo, setPlayerTwo] = useState("Player 2");
  const [winner, setWinner] = useState("");
  const [shuffledCards, setShuffledCards] = useState(shuffleBoard(cards));
  // Will be saved in localqstorage
  const isMounted = useRef(false);

  // Tracking the progress of the game
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });
  const [matches, setMatches] = useState({ playerOne: 0, playerTwo: 0 });
  // turns === true - Player 1 turn; turns === false - Player 1 turn
  const [turns, setTurns] = useState(true);
  // Timer
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // Number of turns
  const [nubmerOfTurns, setNubmerOfTurns] = useState(0);

  useEffect(() => {
    if (timerOn) {
      // Increment the timer every second
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      // Cleanup function to clear the interval when the component is unmounted or the game is over
      return () => clearInterval(timerId);
    }
  }, [timerOn]);

  // Updating Scores for both players and determining the Winner
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

  // Restart button
  const clickRestart = () => {
    setShuffledCards(shuffleBoard(cards));
    setMatches({ playerOne: 0, playerTwo: 0 });
    setTurns(true);
    setGameOver(false);
    setNubmerOfTurns(0);
    setTimer(0);
  };

  const onProgress = (match) => {
    setNubmerOfTurns(nubmerOfTurns + 1);
    if (match) {
      if (turns) {
        setMatches({ ...matches, playerOne: matches.playerOne + 1 });
      } else {
        setMatches({ ...matches, playerTwo: matches.playerTwo + 1 });
      }
    }
    // Changing Player's turns
    if (turns) {
      setTurns(false);
    } else setTurns(true);
  };

  // Get from Local Storage
  useEffect(() => {
    const storedScore = localStorage.getItem("matchGame");
    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, []);

  // Set to Local Storage
  useEffect(() => {
    // We need to skip setting to local storage on a first run
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
      <Typography variant='h4' style={{ marginBottom: "1rem" }}>
        Turns:{nubmerOfTurns}
      </Typography>
      <Typography variant='h5' style={{ marginBottom: "1rem" }}>
        {`Timer: ${formatTime(timer)}`}{" "}
      </Typography>
      <Stack direction='row' style={{ marginBottom: "2rem" }} alignItems='center' justifyContent='center'>
        {!isSmallScreen && <PlayerInfo player={playerOne} matches={matches.playerOne} turns={turns} />}
        <Board
          setGameOver={setGameOver}
          turns={turns}
          onProgress={onProgress}
          setTurns={setTurns}
          nubmerOfTurns={nubmerOfTurns}
          setNubmerOfTurns={setNubmerOfTurns}
          setShuffledCards={setShuffledCards}
          shuffledCards={shuffledCards}
          setTimerOn={setTimerOn}
          timerOn={timerOn}
        />
        {!isSmallScreen && <PlayerInfo player={playerTwo} matches={matches.playerTwo} turns={!turns} />}
      </Stack>
      {isSmallScreen && (
        <Stack direction='row' style={{ marginBottom: "2rem" }}>
          <PlayerInfo player={playerOne} matches={matches.playerOne} />
          <PlayerInfo player={playerTwo} matches={matches.playerTwo} />
        </Stack>
      )}
      <Typography variant='h4' sx={{ textAlign: "center" }}>{`Total Score: Player 1: ${score.playerOne} `}</Typography>
      <Typography variant='h4' sx={{ textAlign: "center" }} style={{ marginBottom: "1rem" }}>
        {`Total Score: Player 2: ${score.playerTwo} `}{" "}
      </Typography>
      {gameOver && (
        <>
          <Button variant='contained' onClick={clickRestart} style={{ fontSize: "2.5rem" }}>
            Restart
          </Button>
          <Typography variant='h3'>{winner === "" ? "Draw!" : `Winner ${winner}`}</Typography>
        </>
      )}
    </Container>
  );
};

export default App;
