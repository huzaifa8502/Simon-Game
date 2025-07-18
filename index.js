//alert("hi");
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started= false;



$(document).keypress(function(){
   if(!started){
     $("h1").text("Stage "+level);
  nextSequence();
  started=true;
   } 
});

$(".btn").on("click",function () {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);  

    checkAnswer(userClickedPattern.length-1);
 });

function checkAnswer(currentLevel){

if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
   {
      console.log("success");
         if(userClickedPattern.length===gamePattern.length){
             setTimeout(function(){
                  nextSequence();
               },1000);
   
}
}else{
       playSound("wrong");
           $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            
            setTimeout(function(){
               $("body").removeClass("game-over"); 
            },200);
           startOver();
  
         }

}




function nextSequence()
{  userClickedPattern=[]; 
   level++;
      $("h1").text("Stage "+level);
    var randomNumber=Math.floor(Math.random()*4);  
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
 
}




function playSound(name)
{
var audio=new Audio ("sounds/"+name+".mp3");
audio.play();
}



function animatePress(currentColour) {
  $("#"+currentColour) .addClass("pressed");
  setTimeout(function(){
      $("#"+currentColour) .removeClass("pressed");

  },100 );
}



function startOver(){
   level=0;
   gamePattern=[];
   started=false;

}
