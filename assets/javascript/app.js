/*
 *GLOBAL VARIABLES
 */
 //Timer 
var timer;
var startingTimerNumber =10;
var pauseTimer;
var questionOrder;
var currentQuestion;
var currentQuestNum;
var answerListLength = 4;
var correctAnswers;
var canClick;

 var TRIVIA_LIST = {
					0: {
							Q: "What is Phoebe's twin sister's name?",
							A: "Ursula",
							A_LIST:{
								0: "Ingrid",
								1: "Abigail",
								2: "Agatha",
								3: "Ursula"
							}
						},
					1: {
							Q: "What is the \"Joey Special\"?",
							A: "Ordering two pizzas",
							A_LIST:{
								0: "Being with two girls at once",
								1: "Ordering everything on the menu",
								2: "A kiss",
								3: "Ordering two pizzas"
							}
						},
					2: {
							Q: "What was the name of the man who lived above Monica and Rachel?",
							A: "Mr. Heckles",
							A_LIST:{
								0: "Mr. Stevens",
								1: "Mr. Becker",
								2: "Mr. Treeger",
								3: "Mr. Heckles"
							}
						},
					3: {
							Q: "What is the name of Chandler's father's Las Vegas all-male burlesque?",
							A: "Viva Las Gaygas",
							A_LIST:{
								0: "Men of Action",
								1: "The All Man Revue",
								2: "Gays on the Strip",
								3: "Viva Las Gaygas"
							}
						},
					4: {
							Q: "What is the name Joey's bedtime penquin pal?",
							A: "Huggsy",
							A_LIST:{
								0: "Maurice",
								1: "Alicia May Emory",
								2: "Krog",
								3: "Huggsy"
							}
						},
					5: {
							Q: "How many times was Ross married?",
							A: "3",
							A_LIST:{
								0: "1",
								1: "2",
								2: "4",
								3: "3"
							}
						},
					6: {
							Q: "How many categories for towels does Monica have?",
							A: "11",
							A_LIST:{
								0: "3",
								1: "7",
								2: "13",
								3: "11"
							}
						}
					};



$(document).ready(function(){
	
	
	//$("#myModal").modal('show');
	startGame();
	
	$(".answerButton").click(function(){
			if(canClick==true){
				checkAnswer($(this).html(), $(this).attr('value'));
			}
		});
});

function startGame(){

	var listLength = Object.keys(TRIVIA_LIST).length;
	currentQuestion =0;
	correctAnswers = 0;
	canClick=true;
	questionOrder = getShuffledArray(listLength);
	changeQuestion();
}



function startTimer(){

	questionTimerNumber=startingTimerNumber;
	$("#timer").html(questionTimerNumber);
	timer = setInterval(updateTimer, 1000);
	clearTimeout(pauseTimer);

}



function updateTimer(){

	questionTimerNumber-=1;
	$("#timer").html(questionTimerNumber);
	if(questionTimerNumber ==5){
		$("#timer").css({"color":"#E91E23"});

	}

	if(questionTimerNumber ==0){
		$("#timerText").html("Time's Up!");
		clearInterval(timer);
		checkAnswer(-1);
	}

}

function questionPause(){
	var pauseTimer = setTimeout(changeQuestion, 1000);
}


function getShuffledArray(arrayLength){
	
	var tempArray = new Array();
	//Create a array containing a numbered list the length based on # of questions
	for(var i = 0; i<arrayLength;++i){
		tempArray.push(i);
	}

	//Randomize the question array numbers
	for(var i=0;i<arrayLength;++i){
		var randNum = Math.floor(Math.random()*arrayLength);
		var tempNum = tempArray[i];
		tempArray[i] = tempArray[randNum];
		tempArray[randNum] = tempNum;
	}
	// for(var i = 0; i<tempArray.length;++i){
	// 	console.log(tempArray[i]);
	// }

	return tempArray;

}

function changeQuestion(){

	//Removes "Time's Up" if displayed
	$("#timerText").html("");
	//Start question Timer

	startTimer();
	//Validates to make sure not to exceed number of questions
	if((currentQuestion+1)<=questionOrder.length){
		canClick=true;

		//Relates random number question array to trivia list
		currentQuestNum = questionOrder[currentQuestion];

		//Display random question
		$("#question").html(TRIVIA_LIST[currentQuestNum]["Q"]);

		//Display number  of questions fraction
		$("#questionNumText").html("Question: "+(currentQuestion+1)+"/"+questionOrder.length);

		//Randomize answer order and display
		var answerArray = getShuffledArray(answerListLength);
		for(var i = 0; i <answerArray.length;++i){
			$("#answer"+i).html(TRIVIA_LIST[currentQuestNum]["A_LIST"][answerArray[i]]);
			$("#answer"+i).attr("class", "buttonNormal answerButton");
			$("#answer"+i).attr("value", i);

		//Reset Timer Color
		$("#timer").css({"color":"#ffffff"});
		}
	}
	else{
		clearTimeout(pauseTimer);
		clearInterval(timer);
		alert("Game Over");
		startGame();

	}

}
function checkAnswer(answer, valueNum){

	clearInterval(timer);
	canClick=false;

	if(answer == TRIVIA_LIST[currentQuestNum]["A"]){
		correctAnswers+=1;
		correctButtonColor(true, valueNum);
	}
	else{
		correctButtonColor(false, valueNum);
	}

	//Display score
	currentQuestion+=1;
	var scorePercent = Math.round(correctAnswers/currentQuestion*100);
	$("#currentScore").html(correctAnswers+"/"+currentQuestion);
	$("#scorePercent").html(scorePercent+"%");

	questionPause();

}

function correctButtonColor(correct, answer){
	var correctNum;
	for(var i =0;i<answerListLength;++i){
		if(TRIVIA_LIST[currentQuestNum]["A"] == $("#answer"+i).html()){
			correctNum = i;
		}
		$("#answer"+i).removeClass("buttonNormal")
		$("#answer"+i).addClass("disabled buttonNormalAfterClick");
	}

	if(!correct){
		$("#answer"+answer).attr("class", "buttonWrong disabled answerButton");
	}
	$("#answer"+correctNum).attr("class", "buttonCorrect disabled answerButton");
}
