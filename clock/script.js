const time = document.getElementById("time");
const date = document.getElementById("date");

const days = [
"Minggu",
"Senin",
"Selasa",
"Rabu",
"Kamis",
"Jumat",
"Sabtu"
];

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

function updateClock(){

    const now = new Date();

    const hour =
    String(now.getHours()).padStart(2,"0");

    const minute =
    String(now.getMinutes()).padStart(2,"0");

    const second =
    String(now.getSeconds()).padStart(2,"0");

    time.innerHTML =
    `${hour}:${minute}:${second}`;

    date.innerHTML =
    `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

updateClock();

setInterval(updateClock,1000);
