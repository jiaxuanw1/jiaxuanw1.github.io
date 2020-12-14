//Runs once at the beginning
function setup() {
  var googleSheetLink = "1klwKRW4qbZqOngRY_yPSqh6U8uj5bHp4J3LYsb828ps";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 
  trivia.categoriesEnabled = true;
}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") background("gray");
  else if (trivia.state == "question") background("lightblue");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("orange");
}

function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
}

function displayCategories() {
  $(".screen").hide();
  $("#category-screen").show();
  trivia.insertCategoriesInfo();
}

function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  $("#correctAnswer").removeClass("highlight");
  $("#feedback").hide();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
  
  var timeLimit = 15;
var startTime = Date.now(); //get the time at the moment a user first sees the question
clearInterval(trivia.countDown);
trivia.countDown = setInterval(function () {
  if (trivia.state == "question") { //ensure the user has not already answered
    var elapsedTime = (Date.now() - startTime)/1000; //calculate the time elapsed
    var clock = timeLimit - Math.floor(elapsedTime);//calculate the countdown w/o decimals
    $('#timer').html(clock);// place the clock time in the html for viewing
    if (clock == 0) { //if time is up
      clearInterval(trivia.countDown); //stops our timer at 0. Don't want -1 ...
      trivia.triggerAnswer(false); //marks the answer as incorrect in trivia library
    }
  }
  else clearInterval(trivia.countDown);
}, 100);//100 is the time interval in milliseconds
}

function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}

function onClickedAnswer(isCorrect) {
  $('#score').html(`${trivia.totalCorrect} of ${trivia.totalAnswered} Correct`);
  if (isCorrect) $("#feedback").html(`Way to go!`).show();
  else $("#feedback").html(`Better luck next time.`).show();
  $("#correctAnswer").addClass("highlight"); //highlight right answer
  //setTimeout(trivia.gotoNextQuestion, 3000); //wait 3 secs...next question
  $("#feedback").append(`<br><button onclick="trivia.gotoNextQuestion();">Next Question</br>`);
}

function onClickedCategory() {
  displayQuestion();
}

function onClickedStart() {
  displayCategories();
}
