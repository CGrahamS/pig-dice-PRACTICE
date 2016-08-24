function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScores = [0];
}

var rollTotal = function(array) {
	var total = 0;
	for (i = 0; i < array.length; i++) {
  total += array[i];
  }
  resultsArray.unshift(total);
}

var rollDie = function() {
  return 1 + Math.floor(Math.random() * 6);
}

Player.prototype.playerRoll = function() {
  var roll = rollDie();
  if (roll !== 1) {
  	this.roundScores[0] += roll;
  	console.log("Roll if not 1: " + roll)
  } else {
  	console.log("Roll if 1: " + true)
  }

}

Player.prototype.playerHold = function() {
  this.totalScore += this.roundScores[0];
  console.log("Round scores before shift: " + this.roundScores);
  this.roundScores.unshift(0);
  console.log("Round scores after shift: " + this.roundScores);
  console.log("Total Score: " + this.totalScore);
  if (this.totalScore >= 100) {
  	console.log("Win condition: " + true);
  	return true;
  } else {
  	console.log("Win condition: " + false);
  }
}
