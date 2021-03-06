const colorDOM = document.querySelector(".nav__color"),
  newGame = document.getElementById("js--newGame"),
  scoreDOM = document.querySelector(".game__score"),
  boxes = document.querySelectorAll(".game__box");

let selectedColor, score, failedCount;

init();

newGame.addEventListener("click", init);

function init() {
  scoreDOM.textContent = 0;

  score = 0;

  boxes.forEach((box) => {
    box.addEventListener("click", checkGame);
  });

  getColors();
}

function gameOver() {
  scoreDOM.textContent = "Game Over!";
  boxes.forEach((box) => {
    box.removeEventListener("click", checkGame);
  });
}

function checkGame() {
  if (this.style.backgroundColor === selectedColor) {
    score += 5;
    getColors();
  } else {
    this.style.display = "none";
    score--;
    failedCount++;
  }

  scoreDOM.textContent = score;

  if (failedCount >= 3) {
    gameOver();
  }
}

function getColors() {
  let colours, color;

  colours = [];

  boxes.forEach((box) => {
    color = getRGB();

    while (colours.includes(color) === true) {
      color = getRGB();
    }

    colours.push(color);

    box.style.display = "block";
    box.style.backgroundColor = color;
  });

  selectedColor = colours[Math.floor(Math.random() * colours.length)];
  colorDOM.textContent = selectedColor;
  failedCount = 0;
}

function getRGB() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
}
