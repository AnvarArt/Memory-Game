import React from "react";
import { Typography } from "@mui/material";

const PlayerInfo = ({ player, matches, turns }) => {
  return (
    <div style={{ color: turns ? "green" : "" }}>
      <Typography variant='h4'>
        {player}: {`Matches: ${matches}`}
      </Typography>
    </div>
  );
};

export default PlayerInfo;
