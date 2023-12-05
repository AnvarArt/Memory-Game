import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Grid } from "@mui/material";
//import "./Board.css";

// const initBoard = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

const initBoard = new Array(6).fill(new Array(6).fill(2));

const onCellHandleClick = (e) => {
  console.log(e.target.innerText);
};

const Board = () => {
  return (
    <Grid style={{ width: "20rem", height: "20rem" }} spacing={2} container columns={{ xs: 4, sm: 8, md: 12 }}>
      {initBoard.map((row, rowIdx) => (
        <Grid container item key={rowIdx} spacing={2}>
          {row.map((cell, cellIdx) => (
            <Grid item key={cellIdx + "cell"} xs={2}>
              <div style={{ border: "1px solid black", height: "100%" }} onClick={onCellHandleClick}>
                {cell}
              </div>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
