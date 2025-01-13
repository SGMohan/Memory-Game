const gridContainer = document.querySelector("#grid");
const resetButton = document.querySelector(".resetButton");
const cardArr = [
  {
    name: "angry",
    img: "./images/1.png",
  },
  {
    name: "arrow",
    img: "./images/2.png",
  },
  {
    name: "burger",
    img: "./images/3.png",
  },
  {
    name: "dead",
    img: "./images/4.png",
  },
  {
    name: "tree",
    img: "./images/5.png",
  },
  {
    name: "panda",
    img: "./images/6.png",
  },
  {
    name: "heart",
    img: "./images/7.png",
  },
  {
    name: "lion",
    img: "./images/8.png",
  },
  {
    name: "angry",
    img: "./images/1.png",
  },
  {
    name: "arrow",
    img: "./images/2.png",
  },
  {
    name: "burger",
    img: "./images/3.png",
  },
  {
    name: "dead",
    img: "./images/4.png",
  },
  {
    name: "tree",
    img: "./images/5.png",
  },
  {
    name: "panda",
    img: "./images/6.png",
  },
  {
    name: "heart",
    img: "./images/7.png",
  },
  {
    name: "lion",
    img: "./images/8.png",
  },
];

let firstCard = null;
let secondCard = null;
let canFlip = true;

cardArr.sort(() => Math.random() - 0.5);

gameBoard();
resetButton.addEventListener("click", resetGame);

function gameBoard() {
  for (let i = 0; i < cardArr.length; i++) {
    const card = document.createElement("div");
    card.className = "card bg-white shadow-lg rounded-lg shadow-black";
    card.setAttribute("data-id", i);
    card.innerHTML = `
            <div class="card-inner ">
                <div class="card-front bg-white shadow-lg rounded-lg">
                    <img src="./images/blank.png" alt="card back" class="rounded-lg">
                </div>
                <div class="card-back">
                    <img src="${cardArr[i].img}" alt="${cardArr[i].name}">
                </div>
            </div>
        `;
    card.addEventListener("click", flipCard);
    gridContainer.appendChild(card);
  }
}

function flipCard() {
  if (!canFlip || this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    canFlip = false;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch =
    firstCard.querySelector(".card-back img").src ===
    secondCard.querySelector(".card-back img").src;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 500);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  canFlip = true;
}

function resetGame() {
  gridContainer.innerHTML = "";
  cardArr.sort(() => Math.random() - 0.5);
  gameBoard();
  resetBoard();
}
