
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;

var started = true;

$(document).keypress(function(){

  if(started){
    $("#level-title").text("Level: "+level);
    nextSequence();
    started = false;
  }
});


$(".btn").click(clicked);

function clicked() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
}

document.addEventListener("keypress", function(event) {
  buttonPressed(event.key);
  animatePress(userClickedPattern[userClickedPattern.length-1]);
  playSound(userClickedPattern[userClickedPattern.length-1]);

  checkAnswer(userClickedPattern.length-1);
});

function buttonPressed(x){
  switch(x){
    case("b" || "B"):
    userClickedPattern.push("blue");
    break;
    case("r" || "R"):
    userClickedPattern.push("red");
    break;
    case("g" || "G"):
    userClickedPattern.push("green");
    break;
    case("y" || "Y"):
    userClickedPattern.push("yellow");
    break;

    default:
    console.log("wrong key");
  }
}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();
    gameOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level: "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");

  setTimeout(function() {
$("body").removeClass("game-over");
  }, 200);
  $("body").addClass("game-over");
}


function startOver(){
  level = 0;
  gamePattern = [];
  // userClickedPattern = [];
  started = true;
}
