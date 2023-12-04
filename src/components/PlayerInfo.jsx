import React from "react";
//import "./PlayerInfo.css";

const PlayerInfo = ({ player, isCurrent }) => {
  return (
    <div className={`player-info ${isCurrent ? "current" : ""}`}>
      <h2>{player.name}</h2>
      <p>Matches: {player.matches}</p>
    </div>
  );
};

export default PlayerInfo;
