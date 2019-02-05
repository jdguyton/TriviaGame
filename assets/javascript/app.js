// Trvia Questions Array

var questions = [
    {
        question: "When was the last time the Minnesota Twins won the World Series?",
        choices: ["2003", "1991", "1987", "1965"],
        answer: 1,
        image: "assets/images/1991WS.jpg"
    },
    {
        question: "Which player has NOT had their number retired by the Twins?",
        choices: ["Kirby Puckett", "Kent Hrbek", "Torii Hunter", "Tony Oliva"],
        answer: 2,
        image: "assets/images/torii.jpg"
    },
    {
        question: "Who was the last Twins pitcher to win the Cy Young award?",
        choices: ["Bert Blyleven", "Johan Santana", "Kyle Gibson", "Brad Radke"],
        answer: 1,
        image: "assets/images/johan.png"
    },
    {
        question: "Who was the last Twins player to win an MVP award?",
        choices: ["Justin Morneau", "Joe Mauer", "Byron Buxton", "Kirby Puckett"],
        answer: 1,
        image: "assets/images/mauer1.jpg"
    },
    {
        question: "The Twins have not won a playoff game since 2004. How many consecutive playoff games have they lost since then?",
        choices: ["13", "19", "7", "9"],
        answer: 0,
        image: "assets/images/13.png"
    },
    {
        question: "Who hit the longest home run at Target Field?",
        choices: ["Miguel Sano", "Nelson Cruz", "Josh Donaldson", "Jim Thome"],
        answer: 3,
        image: "assets/images/thome.jpg"
    },
    {
        question: "Which Twins player holds the MLB record for most batting titles by a catcher?",
        choices: ["Joe Mauer", "AJ Pierzynski", "Brian Harper", "Tim Laudner"],
        answer: 0,
        image: "assets/images/mauer2.jpg"
    },
    {
        question: "Which duo are the Twins' TV commentators?",
        choices: ["Ernie and Bert", "Dick and Bert", "Dick and Jane", "Bobby and Steve"],
        answer: 1,
        image: "assets/images/dickbert.jpg"
    },
    {
        question: "Which Twins manager famously looked like a garden gnome?",
        choices: ["Tom Kelly", "Paul Molitor", "Ron Gardenhire", "Billy Gardner"],
        answer: 2,
        image: "assets/images/gardygnome.jpg"
    },
    {
        question: "What year did the Twins move to Minnesota?",
        choices: ["1949", "1961", "1954", "1969"],
        answer: 1,
        image: "assets/images/twins61.jpg"
    }]


var questionCounter = 0;
var choiceHolder = 0;    
var timerCount = 20;
var interval;
var isRunning = false;
var corAnswer = 0;
var incorAnswer = 0;
var noAnswer = 0; 

// Timer Functionality

function run() {
    if (!isRunning && (timerCount > 0)) {
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
        isRunning = true;
    }
}

function decrement() {
    timerCount--;
    $("#timer").text(timerCount);
    if (timerCount === 0) {
        stop();
        timesUpDisplay(questionCounter);
    }
}

function stop() {
    if(isRunning){
        clearInterval(interval);
        isRunning = false;
    }
}

//Display Questions

function displayQuestion (questionCounter) {
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    var currentQuestion = questions[questionCounter];
    $("#questionsContainer").text(currentQuestion.question);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = $("<div>");
        choice.attr("data-choicevalue", i).attr("class", "choices").text(currentQuestion.choices[i]);
        $("#choicesContainer").append(choice);
    }
    run();
}

function nextQuestion(questionCounter) {
    setTimeout(function(){
    timerCount = 20;
    $("#timer").text(20);
    $(".goodJob").remove();
    $(".xout").remove();
    $(".timesUp").remove();
    displayQuestion(questionCounter);
}, 4450);
}

    //On-Click Functions

    $(document).on("click", ".choices", function() {
        var choiceValue = $(this).attr("data-choicevalue");
        choiceValue = parseInt(choiceValue);
        //Brings click values to the global level.
        choiceHolder = choiceValue;
        
        //Correctness Check

        if (choiceValue === questions[questionCounter].answer) {        
            stop();
            correctDisplay(choiceValue);
        } else {
            stop();
            incorrectDisplay(choiceValue);
        }

        function correctDisplay(choiceValue){
            $("#choicesContainer").empty();
            var image = $("<img>");
                image.attr("src", questions[questionCounter].image).attr("class", "img-fluid corrincorrect");
            $("#choicesContainer").append(image);
            var selection = $("<div>");
                selection.attr("class", "selection").text(questions[questionCounter].choices[choiceValue]);
            $("#choicesContainer").append(selection);
            var confirm = $("<div>");
                confirm.attr("class", "confirm").text("Correct!");
            $("#choicesContainer").append(confirm);
            var goodJob = $("<img>");
                goodJob.attr("src", "assets/images/congrats.gif").attr("class", "img-fluid goodJob");
            $(".jumbotron").append(goodJob);
            questionCounter++;
            corAnswer++;
            if (questionCounter === questions.length) {
                setTimeout(finishedDisplay, 4450);
            } else { 
                nextQuestion(questionCounter);
            }
        }

        function incorrectDisplay(choiceValue){
            $("#choicesContainer").empty();
            var image = $("<img>");
                image.attr("src", questions[questionCounter].image).attr("class", "img-fluid corrincorrect");
            $("#choicesContainer").append(image);
            var selection = $("<div>");
                selection.attr("class", "wrongSelection").text(questions[questionCounter].choices[choiceValue]);
            $("#choicesContainer").append(selection);
            var reveal = $("<div>");
                reveal.attr("class", "reveal").text(questions[questionCounter].choices[questions[questionCounter].answer]);
            $("#choicesContainer").append(reveal);
            var xout = $("<img>");
                xout.attr("src", "assets/images/xout.png").attr("class", "img-fluid xout");
            $(".jumbotron").append(xout);
            questionCounter++;
            incorAnswer++
            if (questionCounter === questions.length) {
                setTimeout(finishedDisplay, 4450);
            } else { 
                nextQuestion(questionCounter);
            }
        }
    });

// Time's Up Display

function timesUpDisplay(chicken){   
    $("#questionsContainer").text(questions[chicken].question);
    $("#choicesContainer").empty();
    var image = $("<img>");
        image.attr("src", questions[chicken].image).attr("class", "img-fluid corrincorrect");
    var timesUpReveal = $("<div>");
        timesUpReveal.attr("class", "timesUpReveal").text("The correct answer was: " + questions[chicken].choices[questions[chicken].answer]);
    $("#choicesContainer").append(image, timesUpReveal);

    var timesUp = $("<img>");
        timesUp.attr("src", "assets/images/timesup.png").attr("class", "img-fluid timesUp");
    $(".jumbotron").append(timesUp);

    noAnswer++;
    questionCounter++;
    if (questionCounter === questions.length) {
        setTimeout(finishedDisplay, 4450);
    } else { 
        nextQuestion(questionCounter);
    }
}

// Finished

function finishedDisplay(){
  
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    $(".goodJob").remove();
    $(".xout").remove();
    $(".timesUp").remove();


    var resultMessage = $("<div>");
        resultMessage.attr("class", "mx-auto resultMessage").html("All done!<br/>Here's how you did!");
    $("#questionsContainer").append(resultMessage);

    var results = $("<div>");
        results.attr("class", "mx-auto results");
    var playAgain = $("<div>");
        playAgain.attr("class", "mx-auto playAgain").text("Play Again?");
    $("#choicesContainer").append(results, playAgain);

    var corAnResults = $("<div>");
        corAnResults.attr("class", "mx-auto corAnResults results-stats").text("Correct Answered: " + corAnswer);
    var incorAnResults = $("<div>");
        incorAnResults.attr("class", "mx-auto incorAnResults results-stats").text("Incorrect Answers: " + incorAnswer);
    var noAnResults = $("<div>");
        noAnResults.attr("class", "mx-auto noAnResults results-stats").text("Unanswered: " + noAnswer);
    $(results).append(corAnResults,incorAnResults,noAnResults);

    var confetti = $("<img>");
        confetti.attr("src", "assets/images/confetti.png").attr("class", "img-fluid confetti");
    $(".jumbotron").append(confetti);
}

$(document).on("click", ".playAgain", function(){
    reset();
});

// Start

function startDisplay(){
    $("#timer").text(20);

    $("#choicesContainer").empty();

    var startImage = $("<img>");
        startImage.attr("src", "assets/images/start.png").attr("class", "img-fluid startImage");
    var startButton = $("<div>");
        startButton.attr("class", "mx-auto startButton").text("Start");
    $("#choicesContainer").append(startImage, startButton);
}

startDisplay();

$(document).on("click", ".startButton", function(){
    displayQuestion(questionCounter);
    $(".timer-div").removeClass("isHidden");
})

// Reset

function reset() {
    $("#questionsContainer").empty();
    $("#choicesContainer").empty();
    $(".confetti").remove();
    questionCounter = 0;
    choiceHolder = 0;    
    timerCount = 20;
    corAnswer = 0;
    incorAnswer = 0;
    noAnswer = 0;
    displayQuestion(questionCounter);
}