//Object constructor for players
function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScore = 0;
  this.lastRoll = 0;
}

function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = player1;
  this.gameOver = false;
}

Game.prototype.switchPlayer = function() {
	if (this.currentPlayer === player1) {
  	this.currentPlayer = player2;
  } else {
  	this.currentPlayer = player1;
  }
}

//Simulates rolling d6
var rollDie = function() {
  return 1 + Math.floor(Math.random() * 6);
}

Player.prototype.playerRoll = function() {
  var roll = rollDie();
  if (roll !== 1) {
  	this.roundScore += roll;
  	console.log("Roll if not 1: " + roll)
  } else {
  	this.roundScore = 0;
    newGame.switchPlayer();
  	console.log("Roll if 1: " + true)
  }
  this.lastRoll = roll;
}

Player.prototype.playerHold = function() {
  this.totalScore += this.roundScore;
  console.log("Total Score: " + this.totalScore);
  this.roundScore = 0;
  if (this.totalScore >= 100) {
  	console.log("Win condition: " + true);
  	return true;
  } else {
  	console.log("Win condition: " + false);
    newGame.switchPlayer();
  }
}
