_ = require('underscore');
core = require('./rr/core');
Robot = core.Robot;
Board = require('./rr/board');
random = require('./rr/random');

// To draw the board, you'll first need to create a board (let b = new Board()) and an array of robots, maybe just one (let robots = [new Robot('A', [0, 0], null)]). You'll need to set the board's targetLoc too (that's where the asterisk will be). Then to draw the board b.draw(robots).

let b = new Board();
//Create a new robot (named A), set it at the 0,0 coordinate in the board (top left corner) and do not assign it a direction
let robots = [new Robot('A', [0, 0], null)]
//Select the third coordinate in the TARGETS array (in the defaultBoard file) and set that as the goal
b.targetLoc = b.possibleTargetLocations[3];
b.draw(robots);

// Moving a robot is a bit weird, instead of the robot's move method changing the robot's location field, it returns a new (different) robot that has the new location. So it'll be something like 'let newRobot = robots[0].move(b, robots, HEADING.EAST)' and then call draw again, but with an array containing the newRobot.

let newRobot = robots[0].move(b, robots, core.HEADING.EAST);
b.draw([newRobot]);
