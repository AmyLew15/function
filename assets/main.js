// Function to render your items in order of appearance
const renderItems = (data) => {
	const startButton = document.querySelector(".start-button");
	const gameDialog = document.getElementById("game");
	const mainContent = document.getElementById("main-content");
	const progressCount = document.getElementById ("progress-count");
	const closeButton = document.getElementById("close-game");
	const progressBar = document.getElementById("progress-bar");
	const questionText = document.getElementById("question");
	const optionsContainer = document.getElementById("options");
	const restartButton = document.getElementById("restart-button");
	const endScreen = document.getElementById("end-screen");


	let currentQuestionIndex = 0;
	let score = 0;

	//Show Question
	const showQuestion = () => {
		endScreen.style.display = "none";
		const progress = ((currentQuestionIndex) / data.length) * 100;
		progressBar.style.width = `${progress}%`;

		//Matches data from JSON to appear as organized options
		const item = data[currentQuestionIndex];
		progressCount.textContent = ` ${currentQuestionIndex + 1} / ${data.length}`;
		const question = item.Question;
		const options = {
			a: item.Option_A,
			b: item.Option_B,
			c: item.Option_C,
			d: item.Option_D,
		};

	//Understands correct answer to assigned question
		let correctLetter = null;
		for (const [key, value] of Object.entries(options)) {
			if (value === item.Answer) {
				correctLetter = key;
			}
		}

	//Connect question to modal
		questionText.textContent = question;
		optionsContainer.innerHTML = "";

	// Loop through each item in the data array
		for (const [key, value] of Object.entries (options)) {
		const button = document.createElement("button");
		button.textContent = `${key.toUpperCase()}: ${value}`;

	//button feedback from being clicked
		button.addEventListener("click", () => {
		const isCorrect = key === correctLetter;
		button.textContent = `${key.toUpperCase()}: ${value}` + (isCorrect ? " Correct!" : " Nope!");
		button.classList.add(isCorrect ? "option-correct" : "option-incorrect");
			if (isCorrect) { 
				score++;
		}

	//Disable answer buttons to allow for only one clicked option at a time
		Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

	//Auto next question after answer is shown
		setTimeout(() => {
			currentQuestionIndex++;
			if (currentQuestionIndex < data.length) {
				showQuestion();
			} else { 
				endGame();
			}
			}, 1000);
	});

	optionsContainer.appendChild(button);
}
};

	//Game end state in modal
		const endGame = () => {
		optionsContainer.innerHTML = "";
		progressBar.style.width = `100%`;
		endScreen.style.display = "flex";

	//Outcome that is successful
	const isSuccess = score >= 8;

	//Outlining Image paired with outcome
		const resultImage = isSuccess ? "assets/Cowboy-pixel.png" : "assets/Rat-pixel.png";

	//Outlining Text paired with outcome
	const resultAlt = isSuccess ? "Cowboy" : "Rat";
	const resultText = isSuccess ? "Wow you know our class!" : "Rats! Try again!";

	//Reflected in Modal
	questionText.innerHTML = `
		<h3 class="result-heading">
			${resultText}
			<img src="${resultImage}" alt="${resultAlt}" class="result-icon"/>
		</h3>
		<p class="result-message">You got ${score} out of ${data.length} correct.</p>
	`;
};

	// Start button click
		startButton.addEventListener("click", () => {
		mainContent.style.display = "none";
		gameDialog.showModal ();
		currentQuestionIndex = 0;
		score = 0;
		showQuestion();
	});

	// Close button click
	closeButton.addEventListener("click", () => {
		gameDialog.close();
		mainContent.style.display = "flex";
	});

	//Restart button click
	restartButton.addEventListener("click", () => {
		endScreen.style.display = "none";
		currentQuestionIndex = 0;
		score = 0;
		showQuestion();
	});
};

// Fetch gets your (local) JSON file…
//Jonathan helped me with randomizing data
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data.sort(() => Math.random() - 0.5).slice(0,10));
	});