$(document).ready(function(){
	//game object
	var game = {
		qIndex: 0,
		qArray: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],
		//questions
		q1: {
			question: "What is the capital city of Montana?",
			a1: "Helena",
			a2: "Billings",
			a3: "Missoula",
			correct: "#a1",
			correctMessage: "Way to get off to a good start!",
			wrongMessage: "Shake it off! We still have 9 questions to go! Does anyone live there anyways?"
			},
		q2: {
			question: "What was the most downloaded iPhone app of 2016?",
			a1: "Instagram",
			a2: "Snapchat",
			a3: "Pokemon Go",
			correct: "#a2",
			correctMessage: "Nice! Unfortunately the Snap Spectacles didn't do as well!",
			wrongMessage: "Snapchat was actually the most downloaded. Facebook Messenger came in second."
			},
		q3: {
			question: "Who was the second President of the United States?",
			a1: "Thomas Jefferson",
			a2: "John Adams",
			a3: "Calvin Coolidge",
			correct: "#a2",
			correctMessage: "Correct! Thomas Jefferson was 3rd. Calvin Coolidge was the 30th.",
			wrongMessage: "Dont worry about it! That was a long time ago..."
			},
		q4: {
			question: "What does the 'A' in NATO stand for?",
			a1: "Atlantic",
			a2: "American",
			a3: "Alliance",
			correct: "#a1",
			correctMessage: "Are you a dipolmat or something?",
			wrongMessage: "This was a tricky one! NATO stands for North Atlantic Treaty Organization."
			},
		q5: {
			question: "Who is the CEO of Tesla Motors?",
			a1: "Jeff Bezos",
			a2: "Warren Buffett",
			a3: "Elon Musk",
			correct: "#a3",
			correctMessage: "And the CEO of SpaceX! Does that guy sleep?",
			wrongMessage: "Better luck on the next one! Elon Musk is the current CEO of Tesla Motors."
			},
		q6: {
			question: "What is the world's longest river?",
			a1: "The Mississippi",
			a2: "The Nile",
			a3: "The Amazon",
			correct: "#a3",
			correctMessage: "Not to be confused with America's largest online retailer Amazon.com.",
			wrongMessage: "The Amazon is actually the longest river at a whopping 4,345 miles!"
			},
		q7: {
			question: "Which country is Prague in?",
			a1: "Switzerland",
			a2: "Czech Republic",
			a3: "Austria",
			correct: "#a2",
			correctMessage: "Czech the correct column for that question!",
			wrongMessage: "Prague is actually the capital of the Czech Republic."
			},
		q8: {
			question: "What blood type do you need to be a universal donor?",
			a1: "O-",
			a2: "AB+",
			a3: "B-",
			correct: "#a1",
			correctMessage: "Nicely done! Did you know that O- types can only receive blood from other O- donors.",
			wrongMessage: "O- can be given to all other blood types."
			},
		q9: {
			question: "What percentage of the world is covered by water??",
			a1: "82%",
			a2: "71%",
			a3: "64%",
			correct: "#a2",
			correctMessage: "Did you also know that the oceans hold about 96.5% of that water?",
			wrongMessage: "Water actually covers 71% of the Earth's surface."
			},
		q10: {
			question: "What is the closest planet to Earth??",
			a1: "Mars",
			a2: "Venus",
			a3: "Mercury",
			correct: "#a2",
			correctMessage: "Even though its closest, it's a bit too hot to hang out on (864 degrees Fahrenheit!)",
			wrongMessage: "Venus is actually the closest with a average distance of 162 million miles."
			},

		//answers
		currentAnswer: "",
		correctAnswer: "",
		canGuess: false,
		//score
		score: 0,
		//timer
		time: 0,
		timeLeft: 8
	}

	//start and restart
	$(".buttonClass").click(function(){
		//reset questions and score
		game.qIndex = 0;
		game.score = 0;
		game.timeLeft = 8;
		//hide welcome screen
		$(".menu").addClass("hide");
		//hide all done screen
		$(".menu").addClass("hide");
		//display questions and answers
		$(".questionAnswers").toggleClass("hide");
		//display clock
		$(".top-middle").toggleClass("hide");
		//Remove correct answer and selected
		$(".answerArea").find(".correct").removeClass("correct");
		$(".answerArea").find(".selected").removeClass("selected");
		newQ();
	});

	//new question
	function newQ() {
		if (game.qIndex < game.qArray.length){
		//display question and answer on screen	
			$("#question").text(game[game.qArray[game.qIndex]].question);
			$("#a1").text(game[game.qArray[game.qIndex]].a1);
			$("#a2").text(game[game.qArray[game.qIndex]].a2);
			$("#a3").text(game[game.qArray[game.qIndex]].a3); 
			$(".timer").text(game.timeLeft);
			$("#questionNumber").text("Q" + (game.qIndex + 1));
			//start countdown
			questionTime();
			//allow guesses
			game.canGuess = true;
			//set correct answer to compare to guess
			game.correctAnswer = game[game.qArray[game.qIndex]].correct;
		}
	}

	//select answer click 
	$(".answer").click(function(){
		if (game.canGuess === true){
			var button = $(this);
			//set as selected answer
			button.toggleClass("selected");
			//remove selected class from previously picked answers
			button.siblings(".selected").toggleClass("selected");
			//sets answer value
			game.currentAnswer = button.attr("value");
		};
	});

	//check answer
	function checkAnswer (){
		game.canGuess = false;
		if (game.currentAnswer === game.correctAnswer) {
			//correct
			//add to score
			game.score++;
			//display correct answer message
			$("#question").text(game[game.qArray[game.qIndex]].correctMessage)
			//display correct answer pill
			$(".right").removeClass("hide");
		} else {
			//incorrect
			//highlight correct answer
			$(game.correctAnswer).toggleClass("correct");
			//display incorrect answer message
			$("#question").text(game[game.qArray[game.qIndex]].wrongMessage)
			//display incorrect answer pill
			$(".wrong").removeClass("hide");
		}
			//remove timer
			$(".top-middle").toggleClass("hide")
			//wait for 10 seconds before restting for next question
			setTimeout(reset, 7000)
	}

	//reset for next question
	function reset() {
		// go to next question
		game.qIndex++; 

		if (game.qIndex < game.qArray.length) {
			//remove classes for styling answers
			$(".answerArea").find(".correct").toggleClass("correct");
			$(".answerArea").find(".selected").toggleClass("selected");
			//reset time
			game.timeLeft = 8;
			//reset answer
			game.currentAnswer = "";
			//go to next question
			// game.qIndex++; 
			//toggle clock back onto page
			$(".top-middle").toggleClass("hide")
			//hide right and wrong divs
			$(".right").addClass("hide");
			$(".wrong").addClass("hide");
			newQ();
		} else {
			allDone()
		}
	}

	//timer stuff
	function qCount() {
		game.timeLeft--;
		$(".timer").css("font-size", "24px")
		$(".timer").text(game.timeLeft);
		$(".timer").animate({fontSize: "32px"});
		//stop at zero and check answer
		if (game.timeLeft === 1) {
			clearInterval(game.time);
			setTimeout(checkAnswer, 1200)
		}
	};

	function questionTime() {
		game.time = setInterval(qCount, 1000);
	};

	// all Done
	function allDone() {
		var message;

		if (game.score === 1) {
			message = "You Answered " + game.score + " Question Correctly!";
		} else {
			message = "You Answered " + game.score + " Questions Correctly!"; 
		}
		
		//hide questions
		$(".questionAnswers").toggleClass("hide");
		//display game over info
		$(".allDone").removeClass("hide");
		//hide correct/incorrect pills for next game
		$(".right, .wrong").addClass("hide");
		//update message to display number of correct answers
		$("#allDoneMessage").text(message);
	}
});

