const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");


document.addEventListener("keydown", (e) => {
  jump();
})

function jump () {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
  }
  setTimeout(()=>{
    dino.classList.remove("jump")
  }, 400)
}

let isAlive = setInterval (() => {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >=140) {
    console.log("Game over")
  }
}, 10)