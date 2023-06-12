
alert("Hello");

alert("Rules of the Game:At each level a new button is added.You have to remember all the previously pressed buttons and press them in order to unlock the new button");

// console.log($("h1"));

const buttonColors=["red","blue","green","yellow"];
function nextSequence(){

    randomNumber=Math.floor(Math.random()*4);
    return randomNumber;
}

//game has started
// var level=1;

var level=1;
var isStarted=false;
var gamePattern=[];
var userResponse=[];

function playSound(color)
{
    var path="sounds/"+color+".mp3";
    var audio=new Audio(path);
    audio.play();
}

function playwrong()
{
    var path="sounds/wrong.mp3";
    var audio=new Audio(path);
    audio.play();
}

function animate(color)
{
    var eleId="#"+color;
    $(eleId).fadeOut(100).fadeIn(100);
}

function startGame()
{
    userResponse=[];
    $("h1").text("Level "+level);
    var randomChosenColour=buttonColors[nextSequence()];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animate(randomChosenColour);
}

function animatePress(eleId)
{
    $(eleId).toggleClass("pressed");
}

function checkAnswer(index)
{
    if(userResponse[index]===gamePattern[index])
    {
        return true;
    }
    else{
        return false;
    }
}

function startover()
{
    gamePattern=[];
    userResponse=[];
    isStarted=false;
    level=1;
}

$(document).on("click",function(event){
    if(isStarted)
    {
        var button=event.target;
        var color=button.id;
        var eleId="#"+color;
        // console.log(eleId);
        
        userResponse.push(color);
        if(checkAnswer(userResponse.length-1)==true)
        {
            if(userResponse.length==gamePattern.length)
            {
                ++level;
                setTimeout(function(){
                    startGame();
                },1000);
            }
            playSound(color);
            animatePress(eleId);
            setTimeout(function(){
                animatePress(eleId);
            },100);
        }
        else
        {
            $("h1").text("Game Over.Press any key to restart");
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            // playwrong();
            // console.log(audio1);
            // playSound("wrong");
            animatePress(eleId);
            setTimeout(function(){
                animatePress(eleId);
            },100);
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },1000);
            startover();
        }
    }
});

$(document).on("keypress",function(event){
    if(isStarted==false)
    {
        isStarted=true;//start the game
        startGame();
    }
});




