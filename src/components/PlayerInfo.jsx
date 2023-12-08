import React from "react";
import { useState } from "react";
//import "./PlayerInfo.css";

const PlayerInfo = () => {
  const [playerOne, setPlayerOne] = useState("Player 1");
  const [playerTwo, setPlayerTwo] = useState("Player 2");
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });

  return (
    <div>
      <h2>
        {playerOne}
        {/* {score} */}
      </h2>
      <h2>
        {playerTwo}
        {/* {score} */}
      </h2>
      <p></p>
    </div>
  );
};

export default PlayerInfo;
