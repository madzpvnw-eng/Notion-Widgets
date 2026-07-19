/* ======================================================
   MADWIDGETS COUNTDOWN
====================================================== */

const eventInput = document.getElementById("eventName");
const dateInput = document.getElementById("targetDate");
const timeInput = document.getElementById("targetTime");
const applyBtn = document.getElementById("applyBtn");

const eventTitle = document.getElementById("eventTitle");
const message = document.getElementById("message");

let targetDate = null;
let timer = null;

/* ======================================================
   FLIP CARDS
====================================================== */

const cards = {};

document.querySelectorAll(".flip-card").forEach(card=>{

    const unit = card.dataset.unit;

    cards[unit]={

        card,

        top:card.querySelector(".top"),

        bottom:card.querySelector(".bottom"),

        topFlip:card.querySelector(".top-flip"),

        bottomFlip:card.querySelector(".bottom-flip"),

        value:null

    };

});

/* ======================================================
   HELPERS
====================================================== */

function pad(number,length=2){

    return String(number).padStart(length,"0");

}

/* ======================================================
   UPDATE
====================================================== */

function update(){

    if(!targetDate) return;

    const now = new Date();

    const distance = targetDate-now;

    if(distance<=0){

        clearInterval(timer);

        return;

    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor(

        (distance%(1000*60*60*24))

        /(1000*60*60)

    );

    const minutes = Math.floor(

        (distance%(1000*60*60))

        /(1000*60)

    );

    const seconds = Math.floor(

        (distance%(1000*60))

        /1000

    );

    updateCard(cards.days,pad(days,3));

    updateCard(cards.hours,pad(hours));

    updateCard(cards.minutes,pad(minutes));

    updateCard(cards.seconds,pad(seconds));

}

/* ======================================================
   FLIP ANIMATION
====================================================== */

function updateCard(card,newValue){

    if(!card) return;

    if(card.value===newValue){

        return;

    }

    const oldValue = card.value ?? newValue;

    card.topFlip.textContent = "";
    card.bottomFlip.textContent = newValue;

    card.topFlip.classList.remove("flip-top");
    card.bottomFlip.classList.remove("flip-bottom");

    // Restart animation
    void card.topFlip.offsetWidth;

    card.topFlip.classList.add("flip-top");
    card.bottomFlip.classList.add("flip-bottom");

    // Setelah animasi selesai
    setTimeout(()=>{

        card.top.textContent = newValue;
        card.bottom.textContent = newValue;

        card.value = newValue;

    },350);

    // Bersihkan class animasi
    setTimeout(()=>{

        card.topFlip.classList.remove("flip-top");
        card.bottomFlip.classList.remove("flip-bottom");

    },700);

}

/* ======================================================
   APPLY BUTTON
====================================================== */

applyBtn.addEventListener("click",()=>{

    if(!dateInput.value){

        alert("Please select a date.");

        return;

    }

    if(!timeInput.value){

        alert("Please select a time.");

        return;

    }

    targetDate = new Date(

        `${dateInput.value}T${timeInput.value}`

    );

    if(targetDate<=new Date()){

        alert("Please choose a future date.");

        return;

    }

    eventTitle.textContent =
        eventInput.value.trim() || "🎉 Countdown";

    message.textContent="";

    clearInterval(timer);

    update();

    timer = setInterval(update,1000);

});

/* ======================================================
   FINISH
====================================================== */

function finishCountdown(){

    Object.values(cards).forEach(card=>{

        updateCard(card,"00");

    });

    eventTitle.textContent="🎉 Event Started!";

    message.textContent="Countdown Finished.";

}

/* ======================================================
   UPDATE OVERRIDE
====================================================== */

const originalUpdate = update;

update = function(){

    if(!targetDate) return;

    const now = new Date();

    const distance = targetDate-now;

    if(distance<=0){

        clearInterval(timer);

        finishCountdown();

        return;

    }

    const days = Math.floor(distance/(1000*60*60*24));

    const hours = Math.floor(

        (distance%(1000*60*60*24))

        /(1000*60*60)

    );

    const minutes = Math.floor(

        (distance%(1000*60*60))

        /(1000*60)

    );

    const seconds = Math.floor(

        (distance%(1000*60))

        /1000

    );

    updateCard(cards.days,String(days).padStart(3,"0"));
    updateCard(cards.hours,String(hours).padStart(2,"0"));
    updateCard(cards.minutes,String(minutes).padStart(2,"0"));
    updateCard(cards.seconds,String(seconds).padStart(2,"0"));

};
