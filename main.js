
let breakTime = 5;
let sessionTime = 25;

let currentTime;

let countdown;
const delay = 1000;

let isSession = true;
let isStart = false;
let isPause = false;

const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const timerLabel = document.getElementById('timer-label');
const timer = document.getElementById('time-left');
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');
const sound = document.getElementById('beep');

sessionLength.innerHTML = ' ' + sessionTime + ' ';
breakLength.innerHTML = ' ' + breakTime + ' ';
timer.innerHTML = sessionTime + ':00';
timerLabel.innerHTML = 'CLOCK';
startStopButton.innerHTML = 'start';
resetButton.innerHTML = 'reset';
resetButton.style.display = 'none';

function startCountdown(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) remainingSeconds = '0' + remainingSeconds;
    timer.innerHTML = minutes + ':' + remainingSeconds;
}

function subtractSessionHandler() {
    sessionTime--;
    if (sessionTime <= 0) sessionTime = 1;
    sessionLength.innerHTML = ' ' + sessionTime + ' ';
    timer.innerHTML = sessionTime + ':00';
}

function addSessionHandler() {
    sessionTime++;
    if (sessionTime > 60) sessionTime = 60;
    sessionLength.innerHTML = ' ' + sessionTime + ' ';
    timer.innerHTML = sessionTime + ':00';
}

function subtractBreakHandler() {
    breakTime--;
    if (breakTime <= 0) breakTime = 1;
    breakLength.innerHTML = ' ' + breakTime + ' ';
}

function addBreakHandler() {
    breakTime++;
    if (breakTime > 60) breakTime = 60;
    breakLength.innerHTML = ' ' + breakTime + ' ';
}

function startStopHandler() {
    if(!isPause && isStart) {
        clearInterval(countdown);
        isPause = true;
        startStopButton.innerHTML = 'start';
    } else if(isPause) {
        isPause = false;
        startStopButton.innerHTML = 'pause';
        startTime(currentTime);
    } else if(!isStart) {
        isSession = true;

        resetButton.style.display = '';
        startStopButton.innerHTML = 'pause';

        isStart = true;

        startTime(sessionTime * 60);
    }
}

function resetHandler() {
    clearInterval(countdown);

    isSession = true;
    isStart = false;
    isPause = false;

    timerLabel.innerHTML = 'CLOCK';
    timer.innerHTML = sessionTime + ':00';
    resetButton.style.display = 'none';
    startStopButton.innerHTML = 'start';
}

function startTime(seconds) {
    currentTime = seconds;

    timerLabel.innerHTML = isSession ? 'SESSION' : 'BREAK';

    clearInterval(countdown);

    countdown = setInterval(function() {
        startCountdown(currentTime);

        if (currentTime === 0) {
            clearInterval(countdown);

            soundPlay();

            isSession = !isSession;

            currentTime = isSession ? sessionTime * 60 : breakTime * 60;

            startTime(currentTime);
        } else currentTime--;
    }, delay);
}

function soundPlay() {
    sound.currentTime = 0;
    sound.play();
}

sessionDecrement.addEventListener('click', subtractSessionHandler);
sessionIncrement.addEventListener('click', addSessionHandler);
breakDecrement.addEventListener('click', subtractBreakHandler);
breakIncrement.addEventListener('click', addBreakHandler);
startStopButton.addEventListener('click', startStopHandler);
resetButton.addEventListener('click', resetHandler);
