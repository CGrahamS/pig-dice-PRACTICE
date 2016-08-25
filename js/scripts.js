//Object constructor for players
function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScore = 0;
  this.lastRoll = 0;
}

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
  if (this.totalScore >= 50) {
  	console.log("Win condition: " + true);
  	newGame.gameOver = true;
  } else {
  	console.log("Win condition: " + false);
    newGame.switchPlayer(player1, player2);
  }
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
var resetGame = function(game, player1, player2) {
  game.player1 = "";
  game.player2 = "";
  game.currentPlayer = "";
  game.gameOver = false;
  player1.name = "";
  player1.totalScore = 0;
  player1.roundScore = 0;
  player1.lastRoll = 0;
  player2.name = "";
  player2.totalScore = 0;
  player2.roundScore = 0;
  player2.lastRoll = 0;
}
var playAgain = function(game, player1, player2) {
  game.currentPlayer = player1;
  game.gameOver = false;
  player1.totalScore = 0;
  player1.roundScore = 0;
  player1.lastRoll = 0;
  player2.totalScore = 0;
  player2.roundScore = 0;
  player2.lastRoll = 0;
}
//UI-LOGIC
$(function() {
  var switchToPlayer1 = function() {
    $("#player-2-roll").prop("disabled", true);
    $("#player-1-roll").prop("disabled", false);
    $("#player-2-hold").prop("disabled", true);
    $("#player-1-hold").prop("disabled", false);
    $("#player-2-rolls").empty();
  }
  var switchToPlayer2 = function() {
    $("#player-1-roll").prop("disabled", true);
    $("#player-2-roll").prop("disabled", false);
    $("#player-1-hold").prop("disabled", true);
    $("#player-2-hold").prop("disabled", false);
    $("#player-1-rolls").empty();
  }
  $("form").submit(function(event){
    event.preventDefault();
    var player1Name = $("input#player-1").val();
    var player2Name = $("input#player-2").val();
    $("input#player-1").val("");
    $("input#player-2").val("");
    var emptyFields = function() {
      $("#player-1-total").empty();
      $("#player-1-round-score").empty();
      $("#player-1-rolls").empty();
      $("#player-2-total").empty();
      $("#player-2-round-score").empty();
      $("#player-2-rolls").empty();
    }
    $("#player-1-name").text(player1Name);
    $("#player-2-name").text(player2Name);
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var newGame = new Game(player1, player2);

    if (player1Name && player2Name) {
      $("#player-names").hide();
      $("#player-buttons").show();
      switchToPlayer1();
      $("#player-1-roll").click(function() {
        player1.roll(newGame, newGame.player1, newGame.player2);
        $("ul#player-1-rolls").last().append("<li>" + player1.lastRoll + "</li>");
        $("#player-1-round-score").text(player1.roundScore);
        if (newGame.currentPlayer === player2) {
          switchToPlayer2();
        }
      });
      $("#player-2-roll").click(function() {
        player2.roll(newGame, newGame.player1, newGame.player2);
        $("ul#player-2-rolls").append("<li>" + player2.lastRoll + "</li>");
        $("#player-2-round-score").text(player2.roundScore);
        if (newGame.currentPlayer === player1) {
          switchToPlayer1();
        }
      });
      $("#player-1-hold").click(function(){
        player1.hold(newGame, newGame.player1, newGame.player2);
        $("#player-1-total").text(player1.totalScore);
        if (newGame.gameOver === true) {
          // alert("Player 1 Wins!")
          $("#player-buttons").hide();
          $("#winner").show();
          $("#winner-name").text(player1.name + " " + "wins with" +  " " + player1.totalScore + "!");
        } else {
          switchToPlayer2();
        }
      });
      $("#player-2-hold").click(function(){
        player2.hold(newGame, newGame.player1, newGame.player2);
        $("#player-2-total").text(player2.totalScore);
        if (newGame.gameOver === true) {
          // alert("Player 2 Winds!")
          $("#player-buttons").hide();
          $("#winner").show();
          $("#winner-name").text(player2.name + " " + "wins with" + " " + player2.totalScore + "!");
        } else {
          switchToPlayer1();
        }
      });
      $("#new-players").click(function(){
        resetGame(newGame, player1, player2);
        $("#winner").hide();
        $("#player-names").show();
        emptyFields();
        $("#player-1-roll").unbind();
        $("#player-2-roll").unbind();
      });
        $("#play-again").click(function(){
          playAgain(newGame, player1, player2);
          $("#winner").hide();
          $("#player-buttons").show();
          emptyFields();
      });
    } else if (player2Name) {
      $("#player-1-alert").show();
      $("#player-2-alert").hide();
      $("#players-alert").hide();
    } else if (player1Name) {
      $("#player-2-alert").show();
      $("#players-alert").hide();
      $("#player-1-alert").hide();
    } else {
      $("#players-alert").show();
      $("#player-1-alert").hide();
      $("#player-2-alert").hide();
    }
  });
});
