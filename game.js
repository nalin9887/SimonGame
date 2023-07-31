var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;
$(".btn").click(function () {
    var userButtonChossen = $(this).attr("id");
    userClickedPattern.push(userButtonChossen);
    playSound(userButtonChossen);
    animatePress(userButtonChossen);
    checkAnswer(userClickedPattern.length-1);
} );
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("LEVEL "+level);
    var randomNUmber = Math.floor(Math.random() * 4);
    console.log(randomNUmber);
    var randomChosenColour = buttonColours[randomNUmber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   

}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
        
    }, 100);
}
$(document).keydown(function(){
    if(!started){
        
        nextSequence();
        started=true;
    }
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("nice");
      if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }}
    else{
     playSound("wrong");
     $("body").addClass("game-over");
     $("h1").text("GAME OVER Press Any Key To Restart")
     setTimeout(() => {
        $("body").removeClass("game-over");
        
     }, 500);
     $(document).keydown(startOver());
    }
    }
    function startOver(){
        level=0;
        gamePattern=[];
        started=false;
    }