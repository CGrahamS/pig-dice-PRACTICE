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
  this.roundScores[0] += roll;
  console.log(roll)
}

Player.prototype.playerHold = function() {
  this.totalScore += this.roundScores[0];
  console.log(this.totalScore);
}
