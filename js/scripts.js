function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.roundScores = [];
  this.rolls = [];
}

var rollDie = function() {
  return 1 + Math.floor(Math.random() * 6);
}
