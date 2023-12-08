import React from "react";
import { useState } from "react";
//import "./PlayerInfo.css";

const PlayerInfo = ({ player, matches, score }) => {
  return (
    <div>
      <h2>
        {player}: {`Score: ${score}`}
      </h2>
      <h2>{`Matches: ${matches}`}</h2>
      <p></p>
    </div>
  );
};

export default PlayerInfo;
