const cells = Array.from(document.querySelectorAll(".cell"));
const grid = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]]
];


const startBtn = document.querySelector(".newGame");
const howToBtn = document.querySelector(".instructions");
const settingsBtn = document.querySelector(".settings");
const scoresBtn = document.querySelector(".scoresBtn");
const backBtn = document.querySelectorAll(".backBtn");
const modeBtn = document.querySelector(".darkMode");



const menu = document.querySelector(".menu");
const howTo = document.querySelector(".instructionsPane");
const settings = document.querySelector(".settingsPane");
const scoreBoard = document.querySelector(".scoreBoard");


const game = document.querySelector(".container");
const resetBtn = document.querySelector(".resetBtn");
const menuBtn = document.querySelector(".menuBtn");




let Xscore = document.querySelector("#Xscore");
let Oscore = document.querySelector("#Oscore");
let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");



let currentPlayer = "X";
let gameActive = true;
let scores = {"X":0, "O":0}

startBtn.addEventListener("click", () =>{
    menu.classList.add("hidden");
    game.classList.remove("hidden");
    modeBtn.classList.add("hidden");
});

howToBtn.addEventListener("click", () =>{
    menu.classList.add("hidden");
    howTo.classList.remove("hidden");
});

settingsBtn.addEventListener("click", () =>{
    menu.classList.add("hidden");
    settings.classList.remove("hidden");
});

scoresBtn.addEventListener("click", () =>{
    menu.classList.add("hidden");
    scoreBoard.classList.remove("hidden");
});

menuBtn.addEventListener("click",()=>{
    game.classList.add("hidden");
    menu.classList.remove("hidden");
    modeBtn.classList.remove("hidden");

});



backBtn.forEach(btn =>{
    btn.addEventListener("click", ()=> {
        menu.classList.remove("hidden");
        howTo.classList.add("hidden");
        settings.classList.add("hidden");
        scoreBoard.classList.add("hidden");
    });
});

modeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        modeBtn.textContent = "Light Mode"
    }else{
        modeBtn.textContent = "Dark Mode"
    }
});


cells.forEach(cell => {
    cell.addEventListener('click', ( ()=> {
        if (gameActive && cell.textContent === ""){
      
            cell.textContent = currentPlayer;
            const winner = checkWinner();

            if (winner){
                alert(winner + " " + "wins !");
                gameActive = false;
                scores[winner]++;
                updateScores();
                

            }
            else if (cells.every(c => c.textContent !== "")) {
                alert("It is a draw");
                gameActive = false;

            }
            else{
                currentPlayer = (currentPlayer==="X") ? "O" : "X";
            } 
        
        }
    }))
});



function checkWinner(){
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [6,4,2], [0,4,8]
    ];
    let combo;
    for (combo of winningCombos){
        const [a,b,c] = combo;
        if(cells[a].textContent !== "" && 
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
         ){
            [cells[a],cells[b],cells[c]].forEach(cell =>{
                cell.classList.add("winner")  
         });
            cells.forEach(cell => {
                cell.classList.add("gameOver");
            });
            winningSide = cells[a].textContent;
            return cells[a].textContent;

        }
    }
    return null;
};

function updateScores(){
    scoreX.textContent =  scores.X;
    scoreO.textContent =  scores.O;
    Xscore.textContent = scores.X;
    Oscore.textContent = scores.O;

};

function reset(){
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner", "gameOver");
    });
    currentPlayer = "X";
    gameActive = true;
};

resetBtn.addEventListener("click", reset);
