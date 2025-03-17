// define the variables
let move = 0;
let rows = 3;
let cols = 3;
const players = ["X", "O"];
let currentPlayer = players[0];
let msg = "Press start to play the game!";
let isWinner = false;

// set the initial state of the board
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

// define winning combinations in an array
const winCombos = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

// render the board
const renderBoard = () => {
  // create and render the cells with the initial state
  const boardContainer = document.querySelector(".board-container");
  if (!boardContainer) return;

  for (let j = 0; j < cols; j++) {
    const col = document.createElement("div");
    col.classList.add("col");
    col.dataset.col = j;
    boardContainer.appendChild(col);

    for (let i = 0; i < rows; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i}-${j}`;
      cell.textContent = board[i][j];
      col.appendChild(cell);

      // add event listener
      cell.addEventListener("click", () => nextMove(cell, i, j));
    }
  }
};

// make the next move
const nextMove = (cell, i, j) => {
  // check if the winner has been declared or not and then continue
  if (isWinner) return;
  if (currentPlayer && cell.textContent === "") {
    move++;
    board[i][j] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = players[move % 2];

    checkWinner();
  }
};

// start the game
const startGame = () => {
  enableCells();
};

// reset the game
const resetGame = () => {
  // add a prompt to confirm reset
  const confirmReset = confirm("Are you sure you want to reset the game?");

  if (!confirmReset) return;

  move = 0;
  currentPlayer = players[0];
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  msg = "";
  isWinner = false;

  // clear the cells
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("highlight");
  });
};

// disable board cells to be clicked
const disableCells = () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.add("disabled");
  });
};

// enable board cells to be clicked
const enableCells = () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("disabled");
  });
};

// display the message
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

// check if there is a winner or if it is a draw
const checkWinner = () => {
  for (const combo of winCombos) {
    const [row1, col1] = combo[0];
    const [row2, col2] = combo[1];
    const [row3, col3] = combo[2];

    const a = board[row1][col1];
    const b = board[row2][col2];
    const c = board[row3][col3];

    if (a === b && b === c && a !== "") {
      displayMessage(`The winner is ${a}!`);

      document.getElementById(`${row1}-${col1}`).classList.add("highlight");
      document.getElementById(`${row2}-${col2}`).classList.add("highlight");
      document.getElementById(`${row3}-${col3}`).classList.add("highlight");
      isWinner = true;
      break;
    }
  }
  // check if the game is a draw
  if (move === 9 && isWinner === false) {
    displayMessage("It is a draw! Try again.");
  }
};

// load DOM content
document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
  disableCells();
  displayMessage(msg);

  document.querySelector("#start-btn").addEventListener("click", startGame);
  document.querySelector("#reset-btn").addEventListener("click", resetGame);
});
