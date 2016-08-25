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

Game.prototype.switchPlayer = function(player1, player2) {
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

Player.prototype.roll = function(newGame, player1, player2) {
  console.log(newGame);
  var roll = rollDie();
  if (roll !== 1) {
  	this.roundScore += roll;
  	console.log("Roll if not 1: " + roll)
  } else {
  	this.roundScore = 0;
    newGame.switchPlayer(player1, player2);
  	console.log("Roll if 1: " + true)
  }
  this.lastRoll = roll;
}

Player.prototype.hold = function(newGame, player1, player2) {
  this.totalScore += this.roundScore;
  console.log("Total Score: " + this.totalScore);
  this.roundScore = 0;
  if (this.totalScore >= 100) {
  	console.log("Win condition: " + true);
  	newGame.gameOver = true;
  } else {
  	console.log("Win condition: " + false);
    newGame.switchPlayer(player1, player2);
  }
}

//UI-LOGIC
$(function() {
  $("form").submit(function(event){
    event.preventDefault();
    var player1Name = $("input#player-1").val();
    var player2Name = $("input#player-2").val();
    $("#player-1-name").text(player1Name);
    $("#player-2-name").text(player2Name);
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var newGame = new Game(player1, player2);
    $("#player-names").hide();
    $("#player-buttons").show();
    $("#player-1-roll").click(function() {
      player1.roll(newGame, newGame.player1, newGame.player2);
      $("ul#player-1-rolls").append("<li>" + player1.lastRoll + "</li>");
    });
  });
});
