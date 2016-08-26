/*
 *GLOBAL VARIABLES
 */ 

//Static variables
var STARTINGTIMERNUMBER =20;  //In seconds
var PAUSETIME = 3;	//In seconds
var ANSWERLISTLENGTH = 4; //Number of answers possible, create object.length function if # answers are not consistant for each question
var WINFILE = "win.mp4";
var LOSEFILE = "lose.mp4";

//Timer variables
var timer;
var pauseTimer;
var buttonTimer;

//Trivia Logic controllers
var questionOrder;
var currentQuestion;
var currentQuestNum;
var correctAnswers;
var canClick;

//Trivia List
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
							Q: "What was the name of the man who lived below Monica and Rachel?",
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
							Q: "What is the name of Joey's bedtime penquin pal?",
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
							Q: "What name is Chandler's TV Guide addressed to?",
							A: "Miss Chanandler Bong",
							A_LIST:{
								0: "Joey Tribiani",
								1: "Chanjoey Bingiani",
								2: "Chandler Bing",
								3: "Miss Chanandler Bong"
							}
						},
					7: {
							Q: "What is the name of Phoebe's most-played song?",
							A: "Smelly Cat",
							A_LIST:{
								0: "Sticky Shoes",
								1: "Mother's Ashes",
								2: "Two of Them Kissed (Last Night)",
								3: "Smelly Cat"
							}
						},
					8: {
							Q: "What made \"Fun Bobby\" fun?",
							A: "He drank a lot",
							A_LIST:{
								0: "He smoked weed a lot",
								1: "He was rich",
								2: "He was a comedian",
								3: "He drank a lot"
							}
						},
					9: {
							Q: "How many categories for towels does Monica have?",
							A: "11",
							A_LIST:{
								0: "3",
								1: "7",
								2: "13",
								3: "11"
							}
						},
					10: {
							Q: "What is Monica's biggest pet peeve?",
							A: "Animals dressed as humans",
							A_LIST:{
								0: "Things being dirty",
								1: "Things being disorganized",
								2: "Food displayed as art",
								3: "Animals dressed as humans"
							}
						},
					11: {
							Q: "According to Chandler, what scares the \"Bejeezus\" out of him?",
							A: "Michael Flatley, Lord of the Dance",
							A_LIST:{
								0: "Being stuck in a box",
								1: "Airplanes",
								2: "Bozo the Clown",
								3: "Michael Flatley, Lord of the Dance"
							}
						},
					12: {
							Q: "What book does Joey put in the Freezer when he gets scared?",
							A: "The Shining",
							A_LIST:{
								0: "Cujo",
								1: "Dracula",
								2: "Pet Sematary",
								3: "The Shining"
							}
						},
					13: {
							Q: "Which country does Chandler tell Janice he’s moving to?",
							A: "Yemen",
							A_LIST:{
								0: "Iran",
								1: "Turkey",
								2: "Romania",
								3: "Yemen"
							}
						},
					14: {
							Q: "What is the name of Phoebe's alter-ego?",
							A: "Regina Phalange",
							A_LIST:{
								0: "Princess Consuela Banana Hammock",
								1: "Rachel Green",
								2: "Nestlé Tollhouse",
								3: "Regina Phalange"
							}
						},
					15: {
							Q: "Who is not a member of the \"I Hate Rachel Green Club\"?",
							A: "Monica Geller",
							A_LIST:{
								0: "Ross Geller",
								1: "Will Colbert",
								2: "Ta-Taka-Ki-Kek",
								3: "Monica Geller"
							}
						},
					16: {
							Q: "What does Ross say that Rachel’s “traditional English trifle” tastes like?",
							A: "Feet",
							A_LIST:{
								0: "Raspberry jam",
								1: "Meat and peas",
								2: "Garabge",
								3: "Feet"
							}
						},
					17: {
							Q: "What is Chandler Bing's job?",
							A: "IT procurement manager",
							A_LIST:{
								0: "Transponster",
								1: "Statistical manager in charge of the WENUS",
								2: "Comic book writer",
								3: "IT procurement manager"
							}
						},
					18: {
							Q: "In what city does Monica and Chandler first have \"relations\"?",
							A: "London",
							A_LIST:{
								0: "New York",
								1: "Las Vegas",
								2: "Montauk",
								3: "London"
							}
						},
					19: {
							Q: "Which of the following actors has not played Phoebe's boyfriend?",
							A: "Bruce Willis",
							A_LIST:{
								0: "Paul Rudd",
								1: "Hank Azaria",
								2: "Charlie Sheen",
								3: "Bruce Willis"
							}
						}

				};

/*
 * Start Game
 */
$(document).ready(function(){
	
	
	$("#myModal").modal('show');
	//startGame();
	
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
	$("#currentScore").html("");
	$("#scorePercent").html("");
}

/*
 * Timer Functions
 */
function startTimer(){

	questionTimerNumber=STARTINGTIMERNUMBER;
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
		clearInterval(timer);
		checkAnswer("",-1);
		$("#timerText").html("Time's Up!");
	}

}

function questionPause(){

	//pauseTimer = setTimeout(changeQuestion, 1000*PAUSETIME);  //No button animation
	pauseTimer = setTimeout(buttonPause, 1000*PAUSETIME);
	
}

//For button animation
function buttonPause(){
	moveButtons();
	buttonTimer = setTimeout(changeQuestion, 1000);
}

/*
 * Game Logic
 */
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

	return tempArray;

}

function changeQuestion(){

	//Removes "Time's Up/Correct/Incorrect" when displayed
	$("#timerText").html("");

	//Start question Timer
	startTimer();

	//Validates to make sure not to exceed number of questions
	if((currentQuestion) < questionOrder.length){

		canClick=true;

		//Reset buttons to original position
		resetButtons();

		//Relates random number question array to trivia list
		currentQuestNum = questionOrder[currentQuestion];

		//Display random question
		$("#question").html(TRIVIA_LIST[currentQuestNum]["Q"]);

		//Display number  of questions fraction
		$("#questionNumText").html("Question: "+(currentQuestion+1)+"/"+questionOrder.length);

		//Randomize answer order and display
		var answerArray = getShuffledArray(ANSWERLISTLENGTH);
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
		endModal();
	}

}

function checkAnswer(answer, valueNum){

	clearInterval(timer);
	canClick=false;

	//Check to see if answer matches correct answer
	if(answer == TRIVIA_LIST[currentQuestNum]["A"]){
		correctAnswers+=1;
		$("#timerText").html("Correct!");
		correctButtonColor(true, valueNum);
	}
	else{
		correctButtonColor(false, valueNum);
		$("#timerText").html("Incorrect!");
	}

	//Display score
	currentQuestion+=1;
	$("#currentScore").html(correctAnswers+"/"+currentQuestion);
	$("#scorePercent").html(getPercentScore()+"%");

	questionPause();

}

function correctButtonColor(correct, answer){
	var correctNum;

	//Find which random button contains the correct answer
	for(var i =0;i<ANSWERLISTLENGTH;++i){
		if(TRIVIA_LIST[currentQuestNum]["A"] == $("#answer"+i).html()){
			correctNum = i;
		}

		//disable all button clicks
		$("#answer"+i).removeClass("buttonNormal")
		$("#answer"+i).addClass("disabled buttonNormalAfterClick");
	}

	//Highlight correct and incorrect buttons
	if(!correct){
		$("#answer"+answer).attr("class", "buttonWrong disabled answerButton");
	}
	$("#answer"+correctNum).attr("class", "buttonCorrect disabled answerButton");
}

function endModal(){
	//Show Modal
	$("#myModal").modal('show');

	//Append video to modal
	var vid = $('<video>');
	vid.attr("class", "videoSize");
	vid.attr("autoplay","autoplay");
	vid.attr("loop","loop");
	vid.text("Your browser does not support the video element.");

	//Show video based on score
	if(getPercentScore() >=70){
		vid.append("<source src=\"assets/video/"+WINFILE+"\">");
	}
	else{
		vid.append("<source src=\"assets/video/"+LOSEFILE+"\">");
	}
	$("#modalVideo").empty();	
	$("#modalVideo").append(vid);
	$("#modalText").attr("class", "endGameText text-center");
	$("#modalText").html("Game Over!<br />"+"Your Score: "+correctAnswers+"/"+currentQuestion+" = "+getPercentScore()+"%");
	$("#modalButtonText").html("Click to play again!");


}

function getPercentScore(){
	return Math.round(correctAnswers/currentQuestion*100);

}


/*
 * Button Animations
 */

function moveButtons(){
		if($( window ).width()>991){
			$(".answerButton").css({"position":"relative"});
			$(".answerButton").animate({left: '750px'}, 750);
		}
}

function resetButtons(){
	if($( window ).width()>991){
		$(".answerButton").removeAttr('style');
	}
}