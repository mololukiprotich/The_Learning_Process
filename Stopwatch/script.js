//var startStopBtn = document.querySelector("start");
//var time = document.querySelector("time");
const hand = document.getElementById("hand");

let seconds = 0;
let minutes = 0;
let hours = 0;
let formattedSeconds;
let formattedMinutes;
let formattedHours;
let timerStatus = 0;
let intervalId = null;

function updateTime(){
    if (seconds < 10){
        formattedSeconds = "0" + seconds;
    }
    else{
        formattedSeconds = seconds;
    }

    if (minutes < 10){
        formattedMinutes = "0" + minutes;
    }
    else{
        formattedMinutes = minutes;
    }

    if (hours < 10){
        formattedHours = "0" + hours;
    }
    else{
        formattedHours = hours;
    }

   document.getElementById("time").innerText = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;

   let angle = seconds * 6;
   hand.style.transform = `rotate(${angle}deg)`;
};

function start(){
    if(!intervalId){
        intervalId = setInterval(()=>{
            seconds ++;
            if (seconds === 60){
                seconds = 0;
                minutes ++ ;
                if (minutes === 60){
                    minutes = 0;
                    hours++;
            }};
            updateTime();
            timerStatus = 1;
     }, 1000);
        
}}

   
function pause(){
    if (timerStatus === 1){
        clearInterval(intervalId);
        intervalId = null;
        timerStatus = 0;
        document.getElementById("pause").innerText = "Resume";
    }else{
        start();
        document.getElementById("pause").innerText = "Pause";

    }
       
    
}

function reset(){
    pause();
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTime();

}

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);

