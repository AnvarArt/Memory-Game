import acura from "../images/acura.png";
import airbus from "../images/airbus.png";
import audi from "../images/audi.png";
import bmw from "../images/bmw.png";
// import bus_yellow from "../images/bus_yellow.png";
import bus from "../images/bus.png";
import chevrolet from "../images/chevrolet.png";
import cruise_ship from "../images/cruise_ship.png";
import ferrari from "../images/ferrari.png";
// import green_truck from "../images/green_truck.png";
import harley from "../images/harley.png";
import mercedes from "../images/mercedes.png";
import motorcycle from "../images/motorcycle.png";
import one_ford from "../images/one_ford.png";
import one_taxi from "../images/one_taxi.png";
import plane from "../images/plane.png";
import ship from "../images/ship.png";
import two_ford from "../images/two_ford.png";
import two_taxi from "../images/two_taxi.png";
import yacht from "../images/yacht.png";

const initCards = [
  { id: 1, name: "acura", image: acura, isFlipped: false, match: false },
  { id: 2, name: "airbus", image: airbus, isFlipped: false, match: false },
  { id: 3, name: "audi", image: audi, isFlipped: false, match: false },
  { id: 4, name: "bmw", image: bmw, isFlipped: false, match: false },
  //   { id: 5, name: "bus", image: bus, isFlipped: false, match: false },
  //   { id: 6, name: "chevrolet", image: chevrolet, isFlipped: false, match: false },
  //   { id: 7, name: "cruise_ship", image: cruise_ship, isFlipped: false, match: false },
  //   { id: 8, name: "ferrari", image: ferrari, isFlipped: false, match: false },
  //   { id: 9, name: "harley", image: harley, isFlipped: false, match: false },
  //   { id: 10, name: "mercedes", image: mercedes, isFlipped: false, match: false },
  //   { id: 11, name: "motorcycle", image: motorcycle, isFlipped: false, match: false },
  //   { id: 12, name: "one_ford", image: one_ford, isFlipped: false, match: false },
  //   { id: 13, name: "one_taxi", image: one_taxi, isFlipped: false, match: false },
  //   { id: 14, name: "plane", image: plane, isFlipped: false, match: false },
  //   { id: 15, name: "ship", image: ship, isFlipped: false, match: false },
  //   { id: 16, name: "two_ford", image: two_ford, isFlipped: false, match: false },
  //   { id: 17, name: "two_taxi", image: two_taxi, isFlipped: false, match: false },
  //   { id: 18, name: "yacht", image: yacht, isFlipped: false, match: false },
  // { id: 19, name: "tractor", image: tractor, isFlipped: false },
  // { id: 20, name: "yacht", image: yacht, isFlipped: false },
];

// export const cards = initCards.reduce((acc, card) => {
//   acc.push(card, { ...card, id: card.id + initCards.length });
//   return acc;
// }, []);

const doubledCards = [];

// Loop through each card in the initCards array
for (let i = 0; i < initCards.length; i++) {
  const card = initCards[i];

  // Add the original card to the new array
  doubledCards.push(card);

  // Create a duplicate of the card with a new unique id and add it to the array
  const duplicateCard = { ...card, id: card.id + initCards.length };
  doubledCards.push(duplicateCard);
}

export const cards = doubledCards;
