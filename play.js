// Generated by CoffeeScript 1.9.3
(function() {
  var Board, EventEmitter, HEADING, Robot, _, aRobotMadeIt, awaitUserInput, b, currentRobot, getPrompt, getRl, move, onRobotChange, random, randomStart, readline, ref, ref1, rl, robotNames, robots, robotsAfterMove, targetLoc, userInputEvents,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('underscore');

  readline = require('readline');

  EventEmitter = require('events');

  ref = require('./rr/core'), HEADING = ref.HEADING, Robot = ref.Robot;

  Board = require('./rr/board');

  random = require('./rr/random');

  randomStart = function(board) {
    var exclusions, robots, targetLoc;
    targetLoc = random.choice(board.possibleTargetLocations);
    exclusions = [[7, 7], [7, 8], [8, 7], [8, 8]];
    robots = [new Robot('A', random.coordExcluding(board.width, board.height, exclusions), null), new Robot('B', random.coordExcluding(board.width, board.height, exclusions), null), new Robot('C', random.coordExcluding(board.width, board.height, exclusions), null), new Robot('D', random.coordExcluding(board.width, board.height, exclusions), null)];
    return {
      targetLoc: targetLoc,
      robots: robots
    };
  };

  b = new Board();

  ref1 = randomStart(b), targetLoc = ref1.targetLoc, robots = ref1.robots;

  b.targetLoc = targetLoc;

  currentRobot = 'A';

  robotNames = _.pluck(robots, 'name');

  getPrompt = function() {
    return "current robot: " + currentRobot + "\nwhich way now? w/a/s/d\n(or change robots)\n🤖 :";
  };

  onRobotChange = function(robot) {
    currentRobot = robot;
    return awaitUserInput();
  };

  userInputEvents = new EventEmitter();

  rl = null;

  getRl = function() {
    if (rl == null) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
    return rl;
  };

  awaitUserInput = function() {
    return getRl().question(getPrompt(), function(a) {
      if (_.contains(['w', 'a', 's', 'd'], a)) {
        return userInputEvents.emit('direction', a);
      } else if (_.contains(robotNames, a)) {
        return userInputEvents.emit('robotChange', a);
      } else {
        console.log("Don't know what to do with: " + a + ", sorry!");
        return awaitUserInput();
      }
    });
  };

  userInputEvents.on('robotChange', onRobotChange);

  userInputEvents.on('direction', function(dir) {
    return move(currentRobot, {
      'w': HEADING.NORTH,
      'd': HEADING.EAST,
      's': HEADING.SOUTH,
      'a': HEADING.WEST
    }[dir]);
  });

  robotsAfterMove = function(board, robots, robot, heading) {
    var i, len, movedR, newRobots;
    movedR = robot.move(board, robots, heading);
    newRobots = [];
    for (i = 0, len = robots.length; i < len; i++) {
      robot = robots[i];
      if (robot.name === movedR.name) {
        newRobots.push(movedR);
      } else {
        newRobots.push(robot);
      }
    }
    return newRobots;
  };

  move = function(robotName, heading) {
    var r;
    r = _.find(robots, function(r) {
      return r.name === robotName;
    });
    if (!(indexOf.call(r.possibleNextHeadings(b, robots), heading) >= 0)) {
      console.log("You can't move that way!");
      return awaitUserInput();
    } else {
      robots = robotsAfterMove(b, robots, r, heading);
      b.draw(robots);
      if (aRobotMadeIt()) {
        console.log('you MADE it! well done.');
        return process.exit(0);
      } else {
        return awaitUserInput();
      }
    }
  };

  aRobotMadeIt = function() {
    return _.any(robots, function(r) {
      return b.targetLoc[0] === r.location[0] && b.targetLoc[1] === r.location[1];
    });
  };

  b.draw(robots);

  if (aRobotMadeIt()) {
    console.log('oddly complete before we started');
    process.exit(0);
  } else {
    awaitUserInput();
  }

}).call(this);
