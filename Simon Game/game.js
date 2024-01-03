var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var toggle1 = true;
var toggle2 = false;
var level = 0;


$(document).keypress(function () {
    
    if (toggle1) {

        $("h1").text("Level " + level);
        nextSequence();
        toggle1 = false;
        toggle2 = true;
    }

})



$(".btn").on("click", function() {

    if (toggle2) {
        var userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        if (checkAnswer(userClickedPattern.length - 1)) {
            setTimeout(function() {
                nextSequence();
            }, 1000)

        }
    }
    

});


function nextSequence() {

    level++
    userClickedPattern = [];

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

};

function playSound(name) {

    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();

};

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100);

};

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        //pass
    } else {
        
        gameOver();

        return false;
    }

    if (gamePattern.length == userClickedPattern.length) {
        return true;
    } else {
        return false;
    }

};

function gameOver() {

    var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        toggle1 = true;
        toggle2 = false;
        level = 0;
        gamePattern = [];

};