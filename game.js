/* Variables to store information */

var btnColorArr = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

/* Start the game by keypress */

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

/* Play the game by user clicks */

$(".btn").click(function () {
  var userColor = $(this).attr("id");
  userClickedPattern.push(userColor);
  animatePress(userColor);
  playSound(userColor);
  checkAnswer(userClickedPattern.length - 1);
});

/* Helper methods */

/**
 * The computer shows the current level and displays to user its chosen color
 * with an indicative sound. The sequence will be memorized and level will
 * be updated.
 * Note that every time level gets incremented, user input should be reset.
 */
function nextSequence() {
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  var randNum = Math.floor(Math.random() * 4);
  var randColor = btnColorArr[randNum];
  gamePattern.push(randColor);

  $("#" + randColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randColor);
  level++;
}

/**
 * Helper function to animate a press from user.
 * @param {string} curColor current color that have been pressed.
 */
function animatePress(curColor) {
  $("#" + curColor).addClass("pressed");
  setTimeout(function () {
    $("#" + curColor).removeClass("pressed");
  }, 100);
}

/**
 * Helper function to play a corresponding sound.
 * @param {string} color the color being pressed.
 */
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Check whether the clicked button is correct or not.
 * If correct, log "success" and check whether next level should be called.
 *      NOTE: the window is always on idle so no need for a isGameOver loop.
 * If incorrect, log "wrong", change background color, set the title, and restart.
 * @param {int} curLevel
 */
function checkAnswer(curLevel) {
  if (gamePattern[curLevel] === userClickedPattern[curLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    restartGame();
  }
}

/**
 * Helper method to restart the game - reset all values to original ones.
 */
function restartGame() {
  start = false;
  level = 0;
  gamePattern = [];
}
