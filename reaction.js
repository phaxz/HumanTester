var clickState = "notStarted"; // notStarted | waiting | ready | clicked | missed
var startTime = 0;
var timeOut;
var time = [];
var timeSum = 0;
var triesCount = 0;

document.addEventListener("DOMContentLoaded", () => {
	let clickArea = document.getElementById("clickArea");
	let waiting = document.getElementById("waiting");
	let reactionTime = document.getElementById("reactionTime");
	let firstClick = document.getElementById("firstClick");
	let missed = document.getElementById("missed");
	let hit = document.getElementById("hit");
	let average = document.getElementById("average");
	let tries = document.getElementById("tries");

	clickArea.addEventListener("click", () => {
		if (clickState == "notStarted") {
			clickState = "waiting";

			firstClick.style.display = "none";

			clickArea.classList.add("waiting");
			clickArea.classList.remove("click");

			timeOut = setTimeout(() => {
				clickState = "ready";
				startTime = new Date().getTime();

				clickArea.classList.add("ready");
				clickArea.classList.remove("waiting");
			}, Math.random() * 8000 + 1000);
		} else if (clickState == "waiting") {
			// waiting

			clearTimeout(timeOut);

			clickArea.classList.add("miss");
			clickArea.classList.remove("waiting");

			missed.style.display = "flex";
			waiting.style.display = "none";

			clickState = "missed";
		} else if (clickState == "ready") {
			// hit
			let delta = new Date().getTime() - startTime;

			hit.style.display = "flex";
			waiting.style.display = "none";
			clickState = "clicked";

			clickArea.classList.add("ready");
			clickArea.classList.remove("waiting");

			triesCount++;
			time.push(delta);
			timeSum += delta;

			average.textContent = Math.round(timeSum / triesCount);
			tries.textContent = triesCount;
			reactionTime.textContent = delta;
		} else if (clickState == "clicked") {
			// click

			hit.style.display = "none";
			waiting.style.display = "flex";

			clickArea.classList.add("waiting");
			clickArea.classList.remove("ready");

			clickState = "waiting";
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				clickState = "ready";
				startTime = new Date().getTime();

				clickArea.classList.add("ready");
				clickArea.classList.remove("waiting");
			}, Math.random() * 8000 + 1000);
		} else if (clickState == "missed") {
			// miss

			waiting.style.display = "flex";
			missed.style.display = "none";

			clickState = "waiting";
			clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				clickState = "ready";
				startTime = new Date().getTime();

				clickArea.classList.add("ready");
				clickArea.classList.remove("waiting");
			}, Math.random() * 8000 + 1000);

			clickArea.classList.remove("miss");
			clickArea.classList.add("waiting");
		} else {
			alert(clickState);
		}
	});
});
