// Function to render your items
const renderItems = (data) => {
	const startButton = document.querySelector(".start-button");
	const closeButton = document.getElementById("close-game");
	const gameSection = document.getElementById("game");
	const startSection = document.getElementById("start");
	const questionText = document.getElementById("question");
	const optionsContainer = document.getElementById("options");

	let currentQuestionIndex = 0;

	//Modal
	document.getElementById("main-content").style.display = "none";
	document.getElementById("main-content").style.display = "block";

	//Show Question
	const showQuestion = () => {
		const item = data[currentQuestionIndex];
		const question = item.Question;
		const options = {
			a: item.Option_A,
			b: item.Option_B,
			c: item.Option_C,
			d: item.Option_D,
		};

		let correctLetter = null;
		for (const [key, value] of Object.entries(options)) {
			if (value === item.Answer) {
				correctLetter = key;
			}
		}

		questionText.textContent = question;
		optionsContainer.innerHTML = "";

	// Loop through each item in the data array
	for (const [key, value] of Object.entries (options)) {
		const button = document.createElement("button");
		button.textContent = `${key.toUpperCase()}: ${value}`;
		button.addEventListener("click",()=>{
			if (key === correctLetter) {
				button.style.backgroundColor = "#0cb352";
			} else {
				button.style.backgroundColor = "#e60c2d";
			}
		//Disable answer buttons
			Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
		});
		optionsContainer.appendChild (button);
	}};

	// Start button click
	startButton.addEventListener("click", () => {
		startSection.style.display = "none";
		gameSection.style.display = "flex";
		gameSection.classList.add("show");
		showQuestion();
	});

	// Close button click
	closeButton.addEventListener("click", () => {
		gameSection.classList.remove("show");
		gameSection.style.display = "none";
		startSection.style.display = "flex";
		currentQuestionIndex = 0;
	});

	// Next button click
	nextButton.addEventListener("click", () => {
		currentQuestionIndex++;
		if (currentQuestionIndex < data.length) {
			showQuestion();
		} else {
			questionText.textContent = "You're done!";
			optionsContainer.innerHTML = "";
			nextButton.style.display = "none";
		}
	});
};

// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})