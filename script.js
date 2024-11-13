let isRunning = false;
let isPaused = false;
let startTime = 0;
let elapsedTime = 0;
let interval;
let lapCount = 0;
let lapTimes = [];

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds, 3)}`;
}

function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    isPaused = false;
    startStopBtn.textContent = "Pause";
    lapBtn.disabled = false;
}

function stopStopwatch() {
    clearInterval(interval);
    isRunning = false;
    isPaused = false;
    startStopBtn.textContent = "Start";
}

function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false;
    isPaused = true;
    startStopBtn.textContent = "Resume";
}

function resumeStopwatch() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    isRunning = true;
    isPaused = false;
    startStopBtn.textContent = "Pause";
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    isPaused = false;
    elapsedTime = 0;
    lapCount = 0;
    lapTimes = [];
    timeDisplay.textContent = formatTime(elapsedTime);
    lapList.innerHTML = "";
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
}

function addLap() {
    lapCount++;
    lapTimes.push(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapItem);
}

startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        if (isPaused) {
            resumeStopwatch();
        } else {
            pauseStopwatch();
        }
    } else {
        startStopwatch();
    }
});

lapBtn.addEventListener("click", addLap);
resetBtn.addEventListener("click", resetStopwatch);
