// Define a class called Stopwatch to encapsulate stopwatch functionality
class Stopwatch {
    // Constructor to initialize the stopwatch with necessary DOM elements and state
    constructor(secondsElement, minutesElement, startBtn, stopBtn, resetBtn) {
        // Initialize instance variables with provided DOM elements and default values
        this.secondsElement = secondsElement;
        this.minutesElement = minutesElement;
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
        this.resetBtn = resetBtn;

        // Initialize timer state variables
        this.seconds = 0;
        this.minutes = 0;
        this.timerId = null; // Holds the interval ID for the timer

        // Disable stop button initially and set its color to white
        this.stopBtn.disabled = true;
        this.stopBtn.style.color = 'white';

        // Bind event listeners to respective methods
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
        this.stopBtn.addEventListener('click', this.stopTimer.bind(this));
        this.resetBtn.addEventListener('click', this.resetTimer.bind(this));
    }

    // Method to start the stopwatch timer
    startTimer() {
        // Enable stop button, disable start button, and set button colors
        this.stopBtn.disabled = false;
        this.startBtn.disabled = true;
        this.startBtn.style.color = 'white';
        this.stopBtn.style.color = 'black';

        // Start the timer interval if not already started
        if (this.timerId === null) {
            this.timerId = setInterval(this.timer.bind(this), 1000); // Call timer every second
        }
    }

    // Method to stop the stopwatch timer
    stopTimer() {
        // Disable stop button, enable start button, and set button colors
        this.stopBtn.disabled = true;
        this.startBtn.disabled = false;
        this.startBtn.style.color = 'black';
        this.stopBtn.style.color = 'white';

        // Clear the timer interval
        clearInterval(this.timerId);
        this.timerId = null; // Reset timer ID
    }

    // Method to reset the stopwatch timer
    resetTimer() {
        // Stop the timer and reset seconds and minutes to zero
        this.stopTimer();
        this.seconds = 0;
        this.minutes = 0;
        this.updateDisplay(); // Update the display with reset values
    }

    // Method called every second by the timer interval to increment seconds and minutes
    timer() {
        // Increment seconds and reset to zero if it reaches 60, then increment minutes
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        this.updateDisplay(); // Update the display with current timer values
    }

    // Method to update the display elements with current timer values
    updateDisplay() {
        // Format seconds and minutes with leading zeros if necessary
        this.secondsElement.innerText = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
        this.minutesElement.innerText = this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`;
    }
}


// Select DOM elements for displaying seconds and minutes
const secondsElement = document.querySelector('#seconds');
const minutesElement = document.querySelector('#minutes');

// Select DOM elements for the control buttons (start, stop, reset)
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resetBtn = document.querySelector('#reset-btn');

// Create an instance of Stopwatch
const stopwatch = new Stopwatch(secondsElement, minutesElement, startBtn, stopBtn, resetBtn);

// Ensure the stopwatch is initialized when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    stopwatch.updateDisplay(); // Initialize display to '00'
});
