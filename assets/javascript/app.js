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

  time = 60;
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

// Display the questions and choices when the quiz starts
$(".start").on("click", function() {
  $(".submit").attr("style","display: initial;") // Display Submit button
  $(".start").attr("style","display: none;") // Hide Start button
  $(".gif").attr("style","display: initial;");
  clockStart(); // Start Clock
  for (var i=0; i < quizBank.length; i++) {
    var question = quizBank[i].q;
    $(".quizPortion").append("<div id='div" + i +"'></div>");
    $("#div" + i).append("<div id='question" + i +"'></div>");
    $("#question" + i).append("<br>","<p id='qp" + i +"'></p>");
    $("#qp" + i).append(question,"<br>");
    $("#div" + i).append("<form class='form-check' id='choices" + i +"'></form>");
    for (var j=0; j < quizBank[i].choices.length; j++) {
      $("#choices" + i).append("<input type='radio' value=" + j + " name='choices' class='form-check-input' id='q" + i + j +"'>",quizBank[i].choices[j],"<br>");
    }
  }
})

// More global variables for the below elements to work
var answeredQs = []
var fullQs = ["choices0", "choices1", "choices2", "choices3", "choices4", "choices5", "choices6", "choices7", "choices8", "choices9"]
var hasBeenClicked = false;
var clockRunning = true;


// Create the timer
var time = 60;
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
  // GAME OVER SCENARIOS
  // If time runs out
  if (time < 0) {
    clockStop();
    calcScore();
    gameover();
  }
}

function clockStop () {
  clockRunning = false;
  clearInterval(intervalID);
}

// GAME OVER SCENARIOS
// If player hits submit
$(".submit").on("click",function(){
  hasBeenClicked = true;
  clockRunning = false;
  clockStop();
  calcScore();
  gameover();
})

// Calculate score
var calcScore = function () {
  $("input:checked").each(function(i,element){
    var answer = $(element).attr("value");
    var parent = $(element).parent("form").attr("id");
    // Correct
    if (answer == quizBank[i].answer) {
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
