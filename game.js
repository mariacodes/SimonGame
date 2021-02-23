var arr = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//click anywhere in body and will go to next sequence
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// $(document).click(function(){
//   nextSequence();
// })


$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
$("#" + currentColor).toggleClass("pressed");

//will wait before removing
setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
},100);
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);


  var randoNum = Math.floor(Math.random() * 4);
  var randomChosenColor = arr[randoNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel] === gamePattern[currentlevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function (){
          nextSequence();
        }, 1000);
    }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    console.log("wrong");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart!");
    startOver();
    }

}

function startOver(){
  started=false;
  level=0;
  gamePattern =[];
}
