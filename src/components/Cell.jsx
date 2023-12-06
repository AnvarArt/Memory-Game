const Cell = ({ card, onCellClick }) => {
  return (
    <div onClick={() => onCellClick(card)}>
      {card.match ? (
        <div style={{ width: "100px", height: "100px" }}>
          <img src={card.image} alt={card.name} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
        </div>
      ) : //, backgroundColor: "green" }} />
      card.isFlipped ? (
        <img src={card.image} alt={card.name} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
      ) : (
        <div style={{ width: "100px", height: "100px", backgroundColor: "blue" }} />
      )}
    </div>
  );
};

export default Cell;
