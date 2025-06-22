/// Step 1: Setup
console.log("Hello Guys!");

// Step 2: Get Computer Choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// Step 3: Get Human Choice (Updated for Node.js environment)
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getHumanChoice() {
  return new Promise((resolve) => {
    readline.question("Choose rock, paper, or scissors: ", (input) => {
      resolve(input.toLowerCase());
    });
  });
}

// Step 4: Declare scores
let humanScore = 0;
let computerScore = 0;

// Step 5: Play a single round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`It's a tie! Both chose ${humanChoice}`);
    return;
  }

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (winConditions[humanChoice] === computerChoice) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
  } else {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
  }
}

// Step 6: Play the game (5 rounds)
async function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const humanSelection = await getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    console.log(`Round ${i + 1} score -> Human: ${humanScore}, Computer: ${computerScore}`);
  }

  console.log("Final Result:");
  if (humanScore > computerScore) {
    console.log("Congratulations! You won the game.");
  } else if (computerScore > humanScore) {
    console.log("Sorry! The computer won the game.");
  } else {
    console.log("It's a draw!");
  }
  readline.close();
}

// Run the game
playGame();
