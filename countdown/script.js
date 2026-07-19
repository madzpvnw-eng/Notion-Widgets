// =========================================
// Elements
// =========================================

const eventInput = document.getElementById("eventName");
const dateInput = document.getElementById("targetDate");
const timeInput = document.getElementById("targetTime");

const applyBtn = document.getElementById("applyBtn");

const eventTitle = document.getElementById("eventTitle");
const message = document.getElementById("message");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// =========================================
// Variables
// =========================================

let countdownInterval = null;
let targetDate = null;

// =========================================
// Helpers
// =========================================

function pad(number) {
    return String(number).padStart(2, "0");
}

function setCountdown(d, h, m, s) {

    days.textContent = d;
    hours.textContent = pad(h);
    minutes.textContent = pad(m);
    seconds.textContent = pad(s);

}

function stopCountdown() {

    clearInterval(countdownInterval);
    countdownInterval = null;

}

// =========================================
// Update Countdown
// =========================================

function updateCountdown() {

    const now = new Date();

    const distance = targetDate - now;

    if (distance <= 0) {

        stopCountdown();

        setCountdown("000", 0, 0, 0);

        message.textContent = "🎉 Event Started!";

        return;

    }

    const totalSeconds = Math.floor(distance / 1000);

    const d = Math.floor(totalSeconds / 86400);

    const h = Math.floor((totalSeconds % 86400) / 3600);

    const m = Math.floor((totalSeconds % 3600) / 60);

    const s = totalSeconds % 60;

    setCountdown(d, h, m, s);

}

// =========================================
// Apply Button
// =========================================

applyBtn.addEventListener("click", () => {

    message.textContent = "";

    if (eventInput.value.trim() === "") {

        eventTitle.textContent = "Countdown";

    } else {

        eventTitle.textContent = eventInput.value;

    }

    if (!dateInput.value) {

        message.textContent = "⚠️ Please choose a date.";

        return;

    }

    if (!timeInput.value) {

        message.textContent = "⚠️ Please choose a time.";

        return;

    }

    targetDate = new Date(`${dateInput.value}T${timeInput.value}`);

    if (targetDate <= new Date()) {

        message.textContent = "⚠️ Please select a future date and time.";

        return;

    }

    stopCountdown();

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);

});
