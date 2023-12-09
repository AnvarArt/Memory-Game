import React from "react";
import { useState } from "react";
//import "./PlayerInfo.css";

const PlayerInfo = ({ player, matches }) => {
  return (
    <div>
      {/* <h2>
        {player}: {`Score: ${score}`}
      </h2> */}
      <h2>
        {player}: {`Matches: ${matches}`}
      </h2>
      <p></p>
    </div>
  );
};

export default PlayerInfo;
