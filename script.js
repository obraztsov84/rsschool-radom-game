console.log("К 23.02.2022 доделаю анимацию кактусов")


const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const toggleBtn=document.querySelector(".toggleBtn");
const scoreBtn = document.querySelector(".scoreBtn")
const scoreTxt=document.getElementById("score-text");
const jumpSfx = document.getElementById("jumpSfx");
const gameMusic = document.getElementById("gameMusic");
const toggleMusicBtn = document.querySelector(".musicBtn");
const gameOverBtn = document.querySelector(".gameOverBtn");
const gameOverModal = document.querySelector(".game-over");
const scoreModal = document.querySelector(".score-modal");
const endGameScore = document.querySelector(".endGameScore");
const lastWord = document.querySelector(".lastWord");
const lastTenScores = document.querySelector(".lastTenScores");
const bestTenScores = document.querySelector(".bestTenScores");
let score = 0;
let calculateScore = false;
let jumpEvent = false; 
let dinoAlive = false;
let isMusic = true;
let isMusicPlaying = false;
let scoreLastTen = [];
let scoreBigTen = [];

const background2=document.querySelector(".background2");
const background1=document.querySelector(".background1");
const background0=document.querySelector(".background0");

  
toggleBtn.addEventListener("click", () => {gameStart()})
document.addEventListener("keydown", (e) => {jump()})

function gameStart () {
    cactus.classList.add("cactus-animation");
    dino.classList.add("dino-run")
    calculateScore = true;
    clearScore();
    toggleBtn.blur();
    background2.classList.add("background2-animation");
    background1.classList.add("background1-animation");
    background0.classList.add("background0-animation");
    dinoAlive = true;
    if (isMusic && !isMusicPlaying) {
      gameMusic.play();
      isMusicPlaying = true;
    };
    gameOverModal.classList.remove("show")
    scoreModal.classList.remove("show");
}




function gameStop () {
  gameOverToggle();
  dino.classList.remove("dino-run")
  cactus.classList.remove("cactus-animation");
  calculateScore = false;
  background2.classList.remove("background2-animation");
  background1.classList.remove("background1-animation");
  background0.classList.remove("background0-animation");
  scoreTxt.innerText = "00000"
  dinoAlive = false;
  setScoreToPanel();
}

function setScoreToPanel() {
  scoreLastTen.push(scoreBeautify(score));
  if (scoreLastTen.length>10) scoreLastTen = scoreLastTen.slice(1, 11);
  setLocalStorage() 
  scoreBigTen.push(scoreBeautify(score));
  scoreBigTen.sort( (a, b) => b - a );
  if (scoreBigTen.length>10) {
    scoreBigTen = scoreBigTen.slice(0, 10);
  }
  setLocalStorage() 
}

function jump () {
  if (dino.classList != "dino-jump") {
    dino.classList.remove("dino-run")
    dino.classList.add("dino-jump");
    jumpSfx.play();
  } 
  if (dino.classList.contains("dino-jump") && !jumpEvent) {
    jumpEvent=true;
    setTimeout(()=>{
    if (dinoAlive) dino.classList.add("dino-run");
    dino.classList.remove("dino-jump");
    jumpEvent=false;
  }, 400)};
}


scoreBtn.addEventListener("click", scoreToggle);

function scoreToggle() {
  scoreModal.classList.toggle("show");
  lastTenScores.innerHTML = ""
  for (let i=0; i<scoreLastTen.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${i+1}. ${scoreLastTen[i]}`;
    lastTenScores.append(li);
  }
  bestTenScores.innerHTML = "";
  for (let i=0; i<scoreBigTen.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${i+1}. ${scoreBigTen[i]}`;
    bestTenScores.append(li);
  }
}

gameOverBtn.addEventListener("click", gameOverToggle);

function gameOverToggle() {
  gameOverBtn.blur();
  gameOverModal.classList.toggle("show");
  lastWord.innerText = lastPhrase[Math.floor(Math.random()*(lastPhrase.length))]
  console.log(lastWord.innerText)
  endGameScore.innerText = scoreBeautify(score);
}

toggleMusicBtn.addEventListener("click", toggleMusic);

function toggleMusic () {
  toggleMusicBtn.blur()
  if (isMusic) {
    isMusic = false;
    toggleMusicBtn.innerText = "Music OFF";
    gameMusic.pause();
    isMusicPlaying = false;
  } else {
    isMusic = true;
    toggleMusicBtn.innerText = "Music ON"
  }
}

function addScore () {
  score+=0.05;
  let beautifulScore = String(Math.floor(score))
  beautifulScore = "0".repeat(5 - beautifulScore.length) + beautifulScore
  scoreTxt.innerText = beautifulScore
};

function scoreBeautify (num) {
  let newScore = String(Math.floor(num))
  return "0".repeat(5 - newScore.length) + newScore
}

function clearScore () {
  scoreTxt.innerText = score = 0;  
}

let isAlive = setInterval (() => {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  
  if (calculateScore) addScore();

  if (cactusLeft < 17 && cactusLeft > 0 && dinoTop >=260) {
    gameStop();  
    console.log("Game over")
  }
}, 10)

lastPhrase = [
  "Очередной динозавр умер так и не достигнув ускользающей цели",
  "Никто не вспомнит об одиноком динозавре павшем на чужой земле",
  "Последняя частичка тепла покинула некогда сильное тело динозавра",
  "Могучая глотка больше не издаст устрашающего рыка, динозавр погиб",
  "Последний вздох, последняя конвульсия, динозавр стал частью кладбища по которому шел"
]

function setLocalStorage() {
  localStorage.setItem('scoreBigTen', scoreBigTen);
  localStorage.setItem('scoreLastTen', scoreLastTen);
}
// window.addEventListener('beforeunload', setLocalStorage)


function getLocalStorage() {

  if(localStorage.getItem('scoreBigTen')) {
    scoreBigTen = localStorage.getItem('scoreBigTen').split(",").sort((a, b)=> b - a);
    
  }
  if(localStorage.getItem('scoreLastTen')) {
    scoreLastTen = localStorage.getItem('scoreLastTen').split(",");
  }
}
window.addEventListener('load', getLocalStorage)