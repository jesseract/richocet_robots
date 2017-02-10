_ = require('underscore');
core = require('./rr/core');
Robot = core.Robot;
Board = require('./rr/board');
random = require('./rr/random');

// A Board has squares, walls, and a target location, it can draw itself.
// A Robot has a heading and a location, it knows how to move until it hits a
//   wall or another robot. It can tell you which ways it may move next.
//
// We will always play with 4 robots names 'A', 'B', 'C', and 'D'
// We win (solve the board), when any robot makes it to the target location of
//  the board.
//
// In the game you can move any robot until it hits a wall or a robot, then the
// robot can move off at right angles, or you can move another robot. Often to
// get to a target location, you will need to move another robot into position
// for a robot to ricochet off of.
//
// You can play the game by hand by running `node play.js`
//
// Some functions that might come in handy:
// returns true if one of the robots is on the target location
var isBoardComplete = function(board, robots){
  return _.any(robots, function (r) {
    return board.targetLoc[0] == r.location[0] && board.targetLoc[1] == r.location[1];
  });
};

// Make all the robots into one string (a bit more efficiently than JSON)
var robotsToString = function (robots) {
  var strings = _.map(robots, function(r){ return r.toString(); });
  return strings.join(',');
};

var robotsFromString = function(s) {
  var strings = s.split(',');
  return _.map(strings, function(s) { return Robot.fromString(s); });
};

// Use this to get the new set of robots when you move a robot, robot.move
// returns a new robot, we're not going to write to robot.location
var robotsAfterMove = function(board, robots, robot, heading) {
  var movedR = robot.move(board, robots, heading);
  var newRobots = [];
  // keep the robots in the same order
  for (var robot of robots) {
    if (robot.name == movedR.name) {
      newRobots.push(movedR);
    } else {
      newRobots.push(robot);
    }
  }
  return newRobots;
};

// For illustrating the solution
var drawPath = function(board, robotPositionStrings) {
  console.log('strings!', robotPositionStrings);
  for (var s of robotPositionStrings) {
    var robots = robotsFromString(s);
    board.draw(robots);
  }
}

// This is the function we need to implement.
var solve = function(board, robots) {
  // your implementation here
}

var randomStart = function(board) {
  // Choose a random target location from among the board's possible target
  // locations
  var targetLoc = random.choice(board.possibleTargetLocations);
  // Place the robots anywhere on the board
  //  (but not the center 4 squares)
  var exclusions = [[7, 7], [7, 8], [8, 7], [8, 8]];
  var robots = [
    new Robot('A', random.coordExcluding(board.width, board.height, exclusions), null),
    new Robot('B', random.coordExcluding(board.width, board.height, exclusions), null),
    new Robot('C', random.coordExcluding(board.width, board.height, exclusions), null),
    new Robot('D', random.coordExcluding(board.width, board.height, exclusions), null)
  ];
  return { targetLoc: targetLoc, robots: robots };
}

// The below runs when you run this file
var b = new Board();
var start = randomStart(b);
b.targetLoc = start.targetLoc
var robots = start.robots;

// print initial state for replaying
console.log('SOLVING FOR');
console.log("var robots = [");
for (var r of robots) {
  console.log("  new Robot('" + r.name + "', [" + r.location + "]),");
}
console.log('];');
console.log("b.targetLoc = [" + b.targetLoc + "];");
console.log('');

// Solve the board state
solve(b, robots);
