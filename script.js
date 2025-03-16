// define the variables
let move = 0;
const players = ["X", "O"];
let rows = 3;
let cols = 3;

// set the initial state of the board
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// render the board
const renderBoard = () => {
  const board = document.querySelector(".board-container");
  console.log("[DEBUG] rendering the board");

  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      // create a cell div
      // append it to the board element
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      board.appendChild(cell);
      console.log("row, col: ", cell.dataset.row, cell.dataset.col);
    }
  }
};

// start the game
const startGame = () => {
  console.log("[DEBUG] start game");
};

// reset the game
const resetGame = () => {
  // add a prompt to confirm reset
  const confirmReset = confirm("Are you sure you want to reset the game?");

  if (!confirmReset) return;
  console.log("[DEBUG] reset game");
};

// make a move
// update the board
// validate the board state
// check if the game is over
// check if there is a winner

// load DOM content
document.addEventListener(
  "DOMContentLoaded",
  (async = () => {
    renderBoard();

    document.querySelector("#start-btn").addEventListener("click", startGame);
    document.querySelector("#reset-btn").addEventListener("click", resetGame);
  })
);
