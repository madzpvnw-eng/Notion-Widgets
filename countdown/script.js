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

const cards = {

    days:{

        top:document.getElementById("days-top"),
        bottom:document.getElementById("days-bottom")

    },

    hours:{

        top:document.getElementById("hours-top"),
        bottom:document.getElementById("hours-bottom")

    },

    minutes:{

        top:document.getElementById("minutes-top"),
        bottom:document.getElementById("minutes-bottom")

    },

    seconds:{

        top:document.getElementById("seconds-top"),
        bottom:document.getElementById("seconds-bottom")

    }

};


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

function updateCard(card,value){

    card.top.textContent=value;
    card.bottom.textContent=value;

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
