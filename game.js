var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".play").click(function() {
    $(".welcommsg").fadeOut(500);
    setTimeout(function () {
      newStart();
    }, 1500);
    
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").html("Game Over! ");
      

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);

      startOver();
      $(".play").show().text("Play Again");
    }
}

function newStart() {
    if (!started) {
      $(".play").text("Level " + level);
        nextSequence();
        started = true;
        $("#level-title").html("Simon Game ");
}
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $(".play").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).fadeIn(200).fadeOut(200).fadeIn(200);
 
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
