import { memo } from "react";
import { Card } from "@mui/material";

const Cell = ({ card, onCellClick, tileSize }) => {
  return (
    <div onClick={() => onCellClick(card)}>
      {card.match || card.isFlipped ? (
        <Card variant='outlined' style={{ width: tileSize, height: tileSize }}>
          <img src={card.image} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Card>
      ) : (
        <Card variant='outlined' style={{ width: tileSize, height: tileSize, backgroundColor: "blue" }}></Card>
      )}
    </div>
  );
};

export default memo(Cell);
