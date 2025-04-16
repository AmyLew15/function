// Function to render your items
const renderItems = (data) => {
	const startButton = document.querySelector(".start-button");
	const closeButton = document.getElementById("close-game");
	const gameDialog = document.getElementById("game");
	console.log(gameDialog);
	const mainContent = document.getElementById("main-content");
	const questionText = document.getElementById("question");
	const optionsContainer = document.getElementById("options");
	const progressBar = document.getElementById("progress-bar");

	let currentQuestionIndex = 0;
	let score = 0;

	//Show Question
	const showQuestion = () => {
		const progress = ((currentQuestionIndex) / data.length) * 100;
		progressBar.style.width = `${progress}%`;
		const item = data[currentQuestionIndex];
		const question = item.Question;
		const options = {
			a: item.Option_A,
			b: item.Option_B,
			c: item.Option_C,
			d: item.Option_D,
		};

	//Correct Answer
		let correctLetter = null;
		for (const [key, value] of Object.entries(options)) {
			if (value === item.Answer) {
				correctLetter = key;
			}
		}

	//Connect question
		questionText.textContent = question;
		optionsContainer.innerHTML = "";

	// Loop through each item in the data array
		for (const [key, value] of Object.entries (options)) {
		const button = document.createElement("button");
		button.textContent = `${key.toUpperCase()}: ${value}`;

		button.style.backgroundColor = "";
		button.style.opacity = "1";
		button.style.transform = "scale(1)";

		button.addEventListener("click", () => {
			const isCorrect = key === correctLetter;
			button.style.backgroundColor = isCorrect ? "#0cb352" : "#e60c2d";
			button.style.backgroundColor = "#8eb7ff";
			if (isCorrect) score++;


	//Disable answer buttons
		Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);

	//Auto next question
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

	//Game end
		const endGame = () => {
		optionsContainer.innerHTML = "";
		progressBar.style.width = `100%`;
		if (score >= 6) {
		questionText.textContent = `Success! 🎉 You got ${score} out of ${data.length} correct.`;
		} else {
		questionText.textContent = `Try again! 😬 You got ${score} out of ${data.length}.`;
	}
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
};

// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	});