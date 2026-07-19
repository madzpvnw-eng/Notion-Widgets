const eventName = document.getElementById("eventName");
const targetDate = document.getElementById("targetDate");
const targetTime = document.getElementById("targetTime");

const applyBtn = document.getElementById("applyBtn");

const eventTitle = document.getElementById("eventTitle");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let countdown;

applyBtn.addEventListener("click", () => {

    if (!targetDate.value || !targetTime.value) {
        alert("Please select a date and time.");
        return;
    }

    eventTitle.textContent = eventName.value || "Countdown";

    const target = new Date(`${targetDate.value}T${targetTime.value}`);

    clearInterval(countdown);

    countdown = setInterval(() => {

        const now = new Date();

        const distance = target - now;

        if (distance <= 0) {

            clearInterval(countdown);

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            eventTitle.textContent = "🎉 Event Started!";

            return;

        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));

        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const s = Math.floor((distance % (1000 * 60)) / 1000);

        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");

    }, 1000);

});
