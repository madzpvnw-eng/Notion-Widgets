// ================================
// Elements
// ================================

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

let timer;

// ================================
// Update Number
// ================================

function updateCard(element, value){

    value = String(value).padStart(2,"0");

    if(element.textContent !== value){

        // nanti animasi flip ditambahkan di sini

        element.textContent = value;

    }

}

// ================================
// Countdown
// ================================

function updateCountdown(target){

    const now = new Date();

    const distance = target - now;

    if(distance <= 0){

        clearInterval(timer);

        updateCard(days,"000");
        updateCard(hours,0);
        updateCard(minutes,0);
        updateCard(seconds,0);

        message.textContent = "🎉 Event Started!";

        return;

    }

    const total = Math.floor(distance/1000);

    const d = Math.floor(total/86400);

    const h = Math.floor((total%86400)/3600);

    const m = Math.floor((total%3600)/60);

    const s = total%60;

    days.textContent = d;

    updateCard(hours,h);
    updateCard(minutes,m);
    updateCard(seconds,s);

}

// ================================
// Apply
// ================================

applyBtn.addEventListener("click",()=>{

    message.textContent="";

    if(!dateInput.value){

        message.textContent="⚠️ Please choose a date.";

        return;

    }

    if(!timeInput.value){

        message.textContent="⚠️ Please choose a time.";

        return;

    }

    const target=new Date(`${dateInput.value}T${timeInput.value}`);

    if(target<=new Date()){

        message.textContent="⚠️ Please choose a future date.";

        return;

    }

    eventTitle.textContent=
    eventInput.value.trim() || "Countdown";

    clearInterval(timer);

    updateCountdown(target);

    timer=setInterval(()=>{

        updateCountdown(target);

    },1000);

});
