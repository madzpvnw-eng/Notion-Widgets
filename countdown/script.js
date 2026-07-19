/* =====================================================
   MadWidgets Countdown
   Part 1 - Countdown Engine
===================================================== */

// ================================
// Elements
// ================================

const eventInput = document.getElementById("eventName");
const dateInput = document.getElementById("targetDate");
const timeInput = document.getElementById("targetTime");
const applyBtn = document.getElementById("applyBtn");

const eventTitle = document.getElementById("eventTitle");
const message = document.getElementById("message");

let countdownDate = null;
let countdownInterval = null;


// ================================
// Flip Card Elements
// ================================

const cards = {};

document.querySelectorAll(".flip-card").forEach(card => {

    const unit = card.dataset.unit;

    cards[unit] = {

        element: card,

        top: card.querySelector(".top"),

        bottom: card.querySelector(".bottom"),

        topFlip: card.querySelector(".top-flip"),

        bottomFlip: card.querySelector(".bottom-flip"),

        value: null

    };

});


// ================================
// Helper
// ================================

function pad(value,digits=2){

    return value.toString().padStart(digits,"0");

}


// ================================
// Update Card
// (sementara tanpa animasi)
// ================================

function updateCard(card,newValue){

    if(card.value===newValue){

        return;

    }

    const oldValue=card.value ?? newValue;

    card.topFlip.textContent=oldValue;

    card.bottomFlip.textContent=newValue;

    card.topFlip.classList.remove("flip-top");

    card.bottomFlip.classList.remove("flip-bottom");

    void card.topFlip.offsetWidth;

    card.topFlip.classList.add("flip-top");

    card.bottomFlip.classList.add("flip-bottom");

    setTimeout(()=>{

        card.top.textContent=newValue;

        card.bottom.textContent=newValue;

        card.value=newValue;

    },300);

    setTimeout(()=>{

        card.topFlip.classList.remove("flip-top");

        card.bottomFlip.classList.remove("flip-bottom");

    },650);

}


// ================================
// Update Countdown
// ================================

function updateCountdown(){

    if(!countdownDate) return;

    const now=new Date();

    const distance=countdownDate-now;

    if(distance<=0){

        clearInterval(countdownInterval);

        updateCard(cards.days,"000");
        updateCard(cards.hours,"00");
        updateCard(cards.minutes,"00");
        updateCard(cards.seconds,"00");

        message.textContent="🎉 Event Started!";

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor(
        (distance%(1000*60*60*24))/
        (1000*60*60)
    );

    const minutes=Math.floor(
        (distance%(1000*60*60))/
        (1000*60)
    );

    const seconds=Math.floor(
        (distance%(1000*60))/1000
    );

    updateCard(cards.days,pad(days,3));
    updateCard(cards.hours,pad(hours));
    updateCard(cards.minutes,pad(minutes));
    updateCard(cards.seconds,pad(seconds));

}


// ================================
// Apply Button
// ================================

applyBtn.addEventListener("click",()=>{

    if(!dateInput.value){

        alert("Please choose a date.");

        return;

    }

    if(!timeInput.value){

        alert("Please choose a time.");

        return;

    }

    countdownDate=new Date(

        `${dateInput.value}T${timeInput.value}`

    );

    if(countdownDate<=new Date()){

        alert("Please choose a future date.");

        return;

    }

    eventTitle.textContent=

        eventInput.value.trim() || "Countdown";

    message.textContent="";

    clearInterval(countdownInterval);

    updateCountdown();

    countdownInterval=

        setInterval(updateCountdown,1000);

});
