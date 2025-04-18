// Function to render your items
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
		endScreen.hidden = true;
		const progress = ((currentQuestionIndex) / data.length) * 100;
		progressBar.style.width = `${progress}%`;
		const item = data[currentQuestionIndex];
		progressCount.textContent = ` ${currentQuestionIndex + 1} / ${data.length}`;
		const question = item.Question;
		const options = {
			a: item.Option_A,
			b: item.Option_B,
			c: item.Option_C,
			d: item.Option_D,
		};

	//Show correct Answer
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

		button.addEventListener("click", () => {
			const isCorrect = key === correctLetter;
			button.classList.add(isCorrect ? "option-correct" : "option-incorrect");

	//Adding feedback to options
		button.textContent += isCorrect ? " Correct!" : " Nope!";
			if (isCorrect) { 
				score++;
		}

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

	//Game end state
		const endGame = () => {
		optionsContainer.innerHTML = "";
		progressBar.style.width = `100%`;
		endScreen.hidden = false;
		if (score >= 8) {
		questionText.textContent = `Wow you know our class! 🎉 You got ${score} out of ${data.length} correct.`;
		} else {
		questionText.textContent = `Rats! Try again! 😬 You got ${score} out of ${data.length} correct.`;
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

	//Restart button click
	restartButton.addEventListener("click", () => {
		endScreen.hidden = true;
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