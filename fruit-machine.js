/** @format */

// Steps to complete this project.
// 1. Deposit money
// 2. Determine number of lines to bet
// 3. Collect the users bet amount
// 4. Spin the slot machine
// 5. Check if the user has won
// 6. Give the user their winnings
// 7. Option to play again

// import the promt package.
const prompt = require('prompt-sync')();

const rows = 3;
const columns = 3;

// amount of symbols in each column
const symbolsCount = {
 A: 2,
 B: 4,
 C: 6,
 D: 8,
};

// payout value of each symbol e.g A*5
const symbolValues = { A: 8, B: 6, C: 4, D: 2 };

// function to collect the deposit from the user.
const collectDepoistMoney = () => {
 while (true) {
  const depositAmount = prompt("Please enter the amount you'd like to deposit: £");
  //  convert the user input to a interger.
  const depositAmountNumber = parseFloat(depositAmount);

  //  check if the value is a valid interger.
  if (isNaN(depositAmountNumber) || depositAmountNumber <= 0) {
   console.log('Please enter a valid deposit amount.');
  } else {
   return depositAmountNumber;
  }
 }
};

//  funciton to prompt the userr the amount of lines they want to bet.

const getNumberOfLinesToBetOn = () => {
 while (true) {
  const usersLines = prompt("Please enter the amount of lines you'd like to bet on (1-3): ");
  const numberOfLines = parseFloat(usersLines);
  if (isNaN(usersLines) || numberOfLines <= 0 || numberOfLines > 3)
   console.log('Invalid number of lines, please enter again.');
  else {
   return numberOfLines;
  }
 }
};

// function to collect the total amount the user wants to bet per line.

const collectValueTheUserWantsToBet = (balance, lines) => {
 while (true) {
  const usersBet = prompt('Enter the amount youd like to bet on per line: £');
  const totalBet = parseFloat(usersBet);

  if (isNaN(usersBet) || usersBet <= 0 || usersBet > balance / lines) {
   console.log('Invalid bet, please re-enter.');
  } else {
   return totalBet;
  }
 }
};

// function to 'spin the machine'
const spinTheMachine = () => {
 // array to contain all possible symbols.
 const arrayForSymbols = [];
 // loop through each symbols count.
 for (const [symbol, count] of Object.entries(symbolsCount)) {
  //  add the number of symbols into the array.
  for (let i = 0; i < count; i++) {
   arrayForSymbols.push(symbol);
  }
 }
 // generate the content inside the rows using the arrayForSymbols.
 const reels = [];

 for (let i = 0; i < columns; i++) {
  reels.push([]);
  const reelSymbols = [...arrayForSymbols];
  for (let j = 0; j < rows; j++) {
   // generate a random number and multiply by the length of the reelSymbols,
   const randomIndex = Math.floor(Math.random() * reelSymbols.length);
   const selectedSymbol = reelSymbols[randomIndex];
   reels[i].push(selectedSymbol);
   reelSymbols.splice(randomIndex, 1);
  }
 }
 return reels;
};

// transpose the data to give us the rows format.

const transposeData = (reels) => {
 const rowsData = [];
 for (let i = 0; i < rows; i++) {
  rowsData.push([]);
  for (let j = 0; j < columns; j++) {
   rowsData[i].push(reels[j][i]);
  }
 }
 return rowsData;
};

// function to print the 'slot machine' to the user.
const printRows = (rows) => {
 for (const row of rows) {
  let rowString = '';
  for (const [i, symbolValue] of row.entries()) {
   rowString += symbolValue;
   if (i != row.length - 1) {
    rowString += ' | ';
   }
  }
  console.log(rowString);
 }
};
// function to see if the user has won, if so, get the winnings.

const getWinnings = (rows, bet, lines) => {
 let winnings = 0;
 for (let row = 0; row < lines; row++) {
  const symbols = rows[row];
  let matchingSymbols = true;
  for (const symbol of symbols) {
   if (symbol != symbols[0]) {
    matchingSymbols = false;
    break;
   }
  }
  if (matchingSymbols) {
   winnings += bet * symbolValues[symbols[0]];
  }
 }
 return winnings;
};

// give the user their winnings.
const completeGame = () => {
 while (true) {
  let balance = collectDepoistMoney();
  console.log(`Your balance is £${balance}`);
  const numberOfLines = getNumberOfLinesToBetOn();
  const bet = collectValueTheUserWantsToBet(balance);
  balance -= bet * numberOfLines;
  const reels = spinTheMachine();
  const rowData = transposeData(reels); // Store the return value in the 'rows' variable
  printRows(rowData); // Pass the 'rows' variable to the printRows function
  const winnings = getWinnings(rowData, bet, numberOfLines);
  balance += winnings;
  console.log(`
  You won £${winnings}`);

  // if balacnce is zero, end the game.
  if (balance <= 0) {
   console.log('Your balance is empty!');
   break;
  }
  // play the game again - yes or no.
  const playAgain = prompt('Do you want to play again? (y/n) ');
  if (playAgain != 'y') break;
 }
};

completeGame();
