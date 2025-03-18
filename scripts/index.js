import winCombos from "./combos.js";

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
    }
  }
};

// update the player
const updatePlayer = () => {
  currentPlayer = players[move % 2];
  document.querySelector(".current-player").textContent = currentPlayer;
};

// start the game
const startGame = () => {
  enableCells();
  updatePlayer();

  while (move > 0 && move <= 9 && isWinner === false) {
    userMove();
  }
};

// make a move by user
const userMove = (event) => {
  if (currentPlayer === "X" && isWinner === false) {
    const cell = event.target;
    const [i, j] = cell.id.split("-").map(Number);
    board[i][j] = currentPlayer;
    cell.textContent = currentPlayer;

    move++;
    checkWinner();

    if (isWinner) {
      disableCells();
      return;
    } else {
      setTimeout(() => updatePlayer(), 500);
      computerMove();
    }
  }
};

// make a move by computer
const computerMove = () => {
  // check if it is the computer's turn
  if (currentPlayer !== "O") return;
  if (isWinner && move > 9) return;
  disableCells();

  // delay the computer move
  setTimeout(() => {
    // fetch the empty cells and their index
    const emptyCells = [];

    if (move < 9) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (board[i][j] === "") {
            emptyCells.push([i, j]);
          }
        }
      }

      // randonly select a cell and make a computer move
      const randomSelection = Math.floor(Math.random() * emptyCells.length);

      const [row, col] = emptyCells[randomSelection];
      board[row][col] = currentPlayer;
      document.getElementById(`${row}-${col}`).textContent = currentPlayer;
      move++;

      checkWinner();
      isWinner ? disableCells() : updatePlayer();
      enableCells();
    }
  }, 800);
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

  // disable the cells
  disableCells();

  // update player
  currentPlayer = players[0];
  updatePlayer();
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
    } else {
      updatePlayer();
    }
  }
  // check if the game is a draw
  if (move === 9 && isWinner === false) {
    displayMessage("It's a draw! Try again.");
  }
};

// load DOM content
document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
  disableCells();
  displayMessage(msg);

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", userMove);
  });

  document.querySelector("#start-btn").addEventListener("click", startGame);
  document.querySelector("#reset-btn").addEventListener("click", resetGame);
});
