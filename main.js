const play = document.getElementById("play");
const stop = document.getElementById("stop");
const board = document.getElementById("board");
const life = document.getElementById("hearts");
const againLose = document.getElementById("playAgain");
const againWin = document.getElementById("againPlay");
const gameOver = document.getElementById("gameOver");
const winner = document.getElementById("winner");
const moves = document.getElementById("moves");
const movesWin = document.getElementById("movesUsed");
const timeSpent = document.getElementById("timeSpent");

let cards = board.querySelectorAll("div");
let hearts = life.querySelectorAll("i");
let timer = document.getElementById("timer");
let heart = 3;
let first = "";
let second = "";
let game = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;


moves.innerHTML = 0;



function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}
function startTimer() {
    t = setTimeout(add, 1000);
}

function stopTimer() {
    clearTimeout(t);
}

function clearTimer(){
    stopTimer();
    timer.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

function startGame() {
    if(!game){
        game = true;
        let first = "";
        let second = "";
        for(var i = 0; i < cards.length; i++){
            var target = Math.floor(Math.random() * cards.length -1) + 1;
            var target2 = Math.floor(Math.random() * cards.length -1) +1;
            cards[target].before(cards[target2]);
        }
        var temp =  Math.floor(Math.random() * cards.length -1) + 1;
        cards[temp].firstElementChild.classList.add("visible");
        setTimeout(() => {
            cards[temp].firstElementChild.classList.remove("visible");
        }, 10);
        startTimer();
    }
};

function resetGame() {
    clearTimer();
    for(var i = hearts.length-1; i >= 0; i-- ){
        if(hearts[i].classList.contains("far")){
            hearts[i].classList.remove("far");
            hearts[i].classList.add("fas");
        }
    }
    moves.innerHTML = 0;
    heart = 3;
    game = false;
    cards.forEach(card => {
        if(card.firstElementChild.classList.contains("visible")){
            card.firstElementChild.classList.remove("visible");
        }
    });
}

function checkWinner() {
    if(cards[0].firstElementChild.classList.contains("visible") && cards[1].firstElementChild.classList.contains("visible") && cards[2].firstElementChild.classList.contains("visible") && cards[3].firstElementChild.classList.contains("visible") && cards[4].firstElementChild.classList.contains("visible") && cards[5].firstElementChild.classList.contains("visible") && cards[6].firstElementChild.classList.contains("visible") && cards[7].firstElementChild.classList.contains("visible") && cards[8].firstElementChild.classList.contains("visible") && cards[9].firstElementChild.classList.contains("visible") && cards[10].firstElementChild.classList.contains("visible") && cards[11].firstElementChild.classList.contains("visible") ){
        winner.classList.add("winner_active");
        movesWin.innerHTML = Number(moves.innerHTML);
        timeSpent.innerHTML = timer.innerHTML;
    }
}


play.addEventListener("click", startGame);

stop.addEventListener("click", resetGame);

againLose.addEventListener("click", () => {
    if(gameOver.classList.contains("gameover_active")){
        gameOver.classList.remove("gameover_active");
    }
    resetGame();
});

againWin.addEventListener("click", () => {
    if(winner.classList.contains("winner_active")){
        winner.classList.remove("winner_active");
    }
    resetGame();
})

cards.forEach(card => {
    card.addEventListener("click", () => {
        if(game){
            if(!card.firstElementChild.classList.contains("visible")){
             if(first === "" && second === ""){
                 moves.innerHTML = Number(moves.innerHTML) + 1;
                 first = card.firstElementChild;
                 first.classList.add("visible");
             } else if (first != "" && second === "") {
                 second = card.firstElementChild;
                 second.classList.add("visible");
                 if(first.classList.value === second.classList.value){
                     checkWinner();
                     first="";
                     second=""
                 } else {
                     for(var i = hearts.length-1; i >= 0; i-- ){
                         if(hearts[i].classList.contains("fas")){
                             hearts[i].classList.remove("fas");
                             hearts[i].classList.add("far");
                             heart = heart - 1;
                             break;
                         }
                     }
                     setTimeout(() => {
                     first.classList.remove("visible");
                      second.classList.remove("visible");
                      first="";
                      second="";
                     }, 500)
                     if(heart === 0){
                         gameOver.classList.add("gameover_active");
                     }
                 }
             }
            }
         }
    });
});

