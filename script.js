/* Stopwatch Variables */
let timer; // stores the setInterval reference
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
let running = false; // tells us if stopwatch is running
let lapCount = 0; // counts number of laps

/* Update stopwatch display */
function updateDisplay() {
// Format values to always show 2 digits (and 3 for ms)
let h = hours < 10 ? "0" + hours : hours;
let m = minutes < 10 ? "0" + minutes : minutes;
let s = seconds < 10 ? "0" + seconds : seconds;
let ms = Math.floor(milliseconds / 10); 
if (ms < 10) ms = "0" + ms;

document.getElementById("display").textContent = `${h}:${m}:${s}.${ms}`;
}

/* Start the stopwatch */
function startTimer() {
if (!running) { // only start if not already running
running = true;
timer = setInterval(() => {
milliseconds += 10;

// Handle rollover from ms → sec → min → hrs
if (milliseconds === 1000) {
milliseconds = 0;
seconds++;
}
if (seconds === 60) {
seconds = 0;
minutes++;
}
if (minutes === 60) {
minutes = 0;
hours++;
}

updateDisplay();
}, 10); // updates every 10 milliseconds
}
}

/* Stop the stopwatch */
function stopTimer() {
clearInterval(timer);
running = false;
}

/* Reset stopwatch to 0 */
function resetTimer() {
clearInterval(timer);
running = false;
milliseconds = seconds = minutes = hours = 0;
updateDisplay();

// Clear laps as well
document.getElementById("laps").innerHTML = "";
lapCount = 0;
}

/* Record a lap (snapshot of current time) */
function recordLap() {
if (running) {
lapCount++;
const lapTime = document.getElementById("display").textContent;
const lapDiv = document.createElement("div");
lapDiv.textContent = `Lap ${lapCount}: ${lapTime}`;
document.getElementById("laps").appendChild(lapDiv);
}
}

/* Toggle Dark/Light Theme */
function toggleTheme() {
document.body.classList.toggle("dark");
}

/* Initialize display when page loads */
updateDisplay();


