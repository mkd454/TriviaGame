// Create an object with all the questions and answers
var quizBank = [
  {q: "In the children's book series, where is Paddington Bear originally from?",
    choices: ["India","Peru","Canada","Iceland"],
    answer: 1}, //Correct: Peru
  {q: "What letter must appear at the beginning of the registration number of all non-military aircraft in the U.S.?",
    choices: ["N","U","A","L"],
    answer: 0}, // Correct: N
  {q: "Who delivered the less famous two-hour speech that preceded Abraham Lincoln's two-minute Gettysburg Address?",
    choices: ["Wendell Phillips","Daniel Webster","Robert G. Ingersoll","Edward Everett"],
    answer: 3}, // Correct: Edward Everett
  {q: "'Nephelococcygia' is the practice of doing what?",
    choices: ["Finding shapes in clouds","Sleeping with your eyes open","Breaking glass with your voice","Swimming in freezing water"],
    answer: 0}, // Correct: Finding shapes in clouds
  {q: "Which insect shorted out an early supercomputer and inspired the term 'computer bug'?",
    choices: ["Moth","Fly","Roach","Japanese beetle"],
    answer: 0}, // Correct: Moth
  {q: "Which of the following men does not have a chemical element named for him?",
    choices: ["Albert Einstein","Niels Bhor","Isaac Newton","Enrico Fermi"],
    answer: 2}, // Correct: Isaac Newton
  {q: "Which of these ships was not one of the three taken over by colonists during the Boston Tea Party?",
    choices: ["Eleanor","Dartmouth","Beaver","William"],
    answer: 3}, // Correct: William
  {q: "Now used to refer to a cat, the word 'tabby' is derived from the name of a district of what world capital?",
    choices:  ["Baghdad","New Delhi","Cairo","Moscow"],
    answer: 0}, // Correct: Baghdad
  {q: "Which First Lady was a ninth-generation descendant of Pocahontas?",
    choices: ["Helen Taft","Edith Wilson","Bess Truman","Mamie Eisenhower"],
    answer: 1}, // Correct: Edith Wilson
  {q: "For ordering his favorite beverages on demand, LBJ had four buttons installed in the Oval Office labeled 'coffee,' 'tea,' 'Coke,' and what?",
    choices: ["Fresca","V8","Yoo-hoo","A&W"],
    answer: 0} // Correct: Fresca
];

// Kick off game
$(".start").on("click", function() {
  $(".quiz").attr("style","display: initial;");
  $(".jumbotron").attr("style","display: none;") // Hide start screen

  // $(".submit").attr("style","display: initial;") // Display Submit button
  // $(".gif").attr("style","display: initial;");

  for (var i=0; i < quizBank.length; i++) {
    clockStart(); // Start Clock
    var question = quizBank[i].q;
    $(".quizPortion").append("<div id='div" + i +"'></div>");
    $("#div" + i).append("<div id='question" + i +"'></div>");
    $("#question" + i).append("<br>","<p id='qp" + i +"'></p>");
    $("#qp" + i).append(question,"<br>");
    $("#div" + i).append("<form class='form-check' id='choicebank" + i +"'></form>");
    for (var j=0; j < quizBank[i].choices.length; j++) {
      $("#choicebank" + i).append("<button value=" + j + " class='choices' id='q" + i + j +"'>" + quizBank[i].choices[j] + "</button>","<br>");
    }
    break;
  }
})

var arraycounter = 0;

$(document).on("click", ".choices", function(event) {
  event.preventDefault();
  clockStop();
  var answer = $(this).attr("value");
  // Correct
  if (answer == quizBank[arraycounter].answer) {
    correct++;
  }
  else { // Incorrect
    incorrect++;
  }
  arraycounter++;
  console.log(correct);
  console.log(incorrect);
  console.log(unanswered);
})

// Calculate score
var calcScore = function () {
  $("#choices").each(function(arraycounter,element){
    var answer = $(element).attr("value");
    var parent = $(element).parent("form").attr("id");
    // Correct
    if (answer == quizBank[arraycounter].answer) {
      correct++;
      answeredQs.push(parent);
    } // Incorrect
    else { 
      incorrect++;
      answeredQs.push(parent);
    }
  })
  // Unanswered questions
  unanswered = fullQs.length - answeredQs.length;
}

var correct=0;
var incorrect=0;
var unanswered=0;

// Reset game
function gameover () { // HIDE ALL ELEMENTS & DISPLAY ANSWER. THEN SHOW AGAIN WHEN RESET.
  $(".timer").hide();
  $(".quizPortion").hide();
  $(".submit").hide();
  $(".gif").hide();
  $(".endGame").show();
  $("#win").text(correct);
  $("#lose").text(incorrect);
  $("#unanswered").text(unanswered);
}

$(".reset").on("click", function () {
  $(".timer").show();
  $(".quizPortion").show();
  $(".submit").show();
  $(".gif").show();
  $(".endGame").hide();
  $("body").scrollTop(0);

  time = 30;
  $("#stopwatch").text("60");
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  answeredQs = [];
  hasBeenClicked = false;
  clockRunning = true;
  $("input:radio").prop("checked", false);
  clockStart();
})

// More global variables for the below elements to work
var hasBeenClicked = false;
var clockRunning = true;


// Create the timer
var time = 10;
var intervalID;

function clockStart () {
  if (clockRunning) {
    clearInterval(intervalID);
    intervalID = setInterval(decrement,1000);
  }
}

function decrement () {
  time--;
  $("#stopwatch").text(time);
  // GAME OVER SCENARIO
  // If time runs out
  if (time < 0) {
    clockStop();
    unanswered++;
    arraycounter++;
  }
}

function clockStop () {
  clockRunning = false;
  clearInterval(intervalID);
}

// GAME OVER SCENARIOS
// If player chooses a chocice
$(".submit").on("click",function(){
  hasBeenClicked = true;
  clockRunning = false;
  clockStop();
  calcScore();
  gameover();
})

