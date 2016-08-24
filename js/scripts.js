function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScores = [0];
  this.rolls = [];
}

var rollDie = function() {
  return 1 + Math.floor(Math.random() * 6);
}

Player.prototype.playerRoll = function() {
  var roll = rollDie();
  this.rolls.unshift(roll);
  var round = this.rolls[0] + this.roundScores[0];
  this.roundScores.unshift(round);
}
