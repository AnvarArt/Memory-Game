import React from "react";
import { Typography } from "@mui/material";

const PlayerInfo = ({ player, matches, turns }) => {
  return (
    <div>
      <Typography variant='h4' style={{ color: turns ? "green" : "" }}>
        {player}: {`Matches: ${matches}`}
      </Typography>
    </div>
  );
};

export default PlayerInfo;
