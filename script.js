const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const toggleBtn=document.querySelector(".toggleBtn");
const scoreTxt=document.getElementById("score-text");
let score = 0;
let calculateScore = false;
let jumpEvent = false; 

const background2=document.querySelector(".background2");
const background1=document.querySelector(".background1");
const background0=document.querySelector(".background0");

  
toggleBtn.addEventListener("click", () => {gameStart()})
document.addEventListener("keydown", (e) => {jump()})

function gameStart () {
    cactus.classList.add("cactus-animation");
    console.log("gamestart event")
    calculateScore = true;
    clearScore();
    toggleBtn.blur();
    background2.classList.add("background2-animation");
    background1.classList.add("background1-animation");
    background0.classList.add("background0-animation");
}

function gameStop () {
  cactus.classList.remove("cactus-animation");
  calculateScore = false;
  background2.classList.remove("background2-animation");
  background1.classList.remove("background1-animation");
  background0.classList.remove("background0-animation");

}

function jump () {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
  } 
  if (dino.classList.contains("jump") && !jumpEvent) {
    jumpEvent=true;
    setTimeout(()=>{
    dino.classList.remove("jump");
    jumpEvent=false;
  }, 400)};
}

function addScore () {
  score+=0.05;
  let beautifulScore = String(Math.floor(score))
  beautifulScore = "0".repeat(5 - beautifulScore.length) + beautifulScore
  scoreTxt.innerText = beautifulScore
};


function clearScore () {
  scoreTxt.innerText = score = 0;  
  console.log("clear score")
}

let isAlive = setInterval (() => {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  
  if (calculateScore) addScore();

  if (cactusLeft < 17 && cactusLeft > 0 && dinoTop >=240) {
    gameStop();  
    console.log("Game over")
  }
}, 10)