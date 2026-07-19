const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const months = [
"Januari",
"Februari",
"Maret",
"April",
"Mei",
"Juni",
"Juli",
"Agustus",
"September",
"Oktober",
"November",
"Desember"
];

let today = new Date();

let month = today.getMonth();
let year = today.getFullYear();

function renderCalendar(){

    daysContainer.innerHTML="";

    monthYear.textContent =
        `${months[month]} ${year}`;

    const firstDay =
        new Date(year,month,1).getDay();

    const totalDays =
        new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        const empty =
        document.createElement("div");

        daysContainer.appendChild(empty);

    }

    for(let day=1;day<=totalDays;day++){

        const div =
        document.createElement("div");

        div.classList.add("day");

        div.innerText=day;

        if(
            day===today.getDate() &&
            month===today.getMonth() &&
            year===today.getFullYear()
        ){
            div.classList.add("today");
        }

        daysContainer.appendChild(div);

    }

}

prevBtn.onclick=()=>{

    month--;

    if(month<0){
        month=11;
        year--;
    }

    renderCalendar();

}

nextBtn.onclick=()=>{

    month++;

    if(month>11){
        month=0;
        year++;
    }

    renderCalendar();

}

renderCalendar();
