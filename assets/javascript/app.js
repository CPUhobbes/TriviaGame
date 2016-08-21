/*
 *GLOBAL VARIABLES
 */
var timer;
var questionTimer = 20;
var questionOrder;
var currentQuestion;
var currentQuestNum;
var answerListLength = 4;

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
	
	$(".answers").click(function(){
			checkAnswer($(this).html());
		});
	
	//$("#myModal").modal('show');
	startGame();

	


});

function startGame(){
	var listLength = Object.keys(TRIVIA_LIST).length;
	currentQuestion =0;
	questionOrder = getShuffledArray(listLength);
	startTimer();


}



function startTimer(){
	changeQuestion();
	timer = setInterval(updateTimer, 1000);

}



function updateTimer(){

	
	$("#timer").html(questionTimer);
	questionTimer-=1;
	if(questionTimer ==-1){

		clearInterval(timer);

	}

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
	for(var i = 0; i<tempArray.length;++i){
		console.log(tempArray[i]);
	}

	return tempArray;

}

function changeQuestion(){
	//Relates random number question array to trivia list
	currentQuestNum = questionOrder[currentQuestion];

	//Display random question
	$("#question").html(TRIVIA_LIST[currentQuestNum]["Q"]);

	//Randomize answer order and display
	var answerArray = getShuffledArray(answerListLength);
	for(var i = 0; i <answerArray.length;++i){
		$("#answer"+i).html(TRIVIA_LIST[currentQuestNum]["A_LIST"][answerArray[i]]);

	}

}
function checkAnswer(answer){
	if(answer == TRIVIA_LIST[currentQuestNum]["A"])
		alert("correct");
	else
		alert("wrong");

}
