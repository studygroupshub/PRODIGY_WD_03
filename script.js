console.log("Welcome to Tic Tac Toe Game");

let turn = "X";
let isgameover = false;
let isAiMode = false; // false = PvP, true = Player vs Computer

// Turn Change
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Check Win Function
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won!";
      isgameover = true;

      // Highlight Winning Boxes
      e.forEach((index) => {
        document.getElementsByClassName("box")[index].style.backgroundColor =
          "rgba(0, 229, 255, 0.3)";
      });
    }
  });
};

// --- SMART COMPUTER LOGIC ---
const computerMove = () => {
  if (isgameover) return;

  setTimeout(() => {
    if (isgameover) return;

    let boxtexts = document.getElementsByClassName("boxtext");
    let moveMade = false;

    // Winning Combinations Indices
    let wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // 1. ATTACK: क्या कंप्यूटर (O) जीत सकता है?
    if (!moveMade) {
      for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        let bA = boxtexts[a].innerText;
        let bB = boxtexts[b].innerText;
        let bC = boxtexts[c].innerText;

        // अगर 2 "O" हैं और तीसरा खाली है, तो वहाँ चलो
        if (bA == "O" && bB == "O" && bC == "") {
          clickBox(c);
          moveMade = true;
          break;
        }
        if (bA == "O" && bC == "O" && bB == "") {
          clickBox(b);
          moveMade = true;
          break;
        }
        if (bB == "O" && bC == "O" && bA == "") {
          clickBox(a);
          moveMade = true;
          break;
        }
      }
    }

    // 2. DEFENSE: क्या प्लेयर (X) जीतने वाला है? उसे रोको!
    if (!moveMade) {
      for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        let bA = boxtexts[a].innerText;
        let bB = boxtexts[b].innerText;
        let bC = boxtexts[c].innerText;

        // अगर 2 "X" हैं और तीसरा खाली है, तो ब्लॉक करो
        if (bA == "X" && bB == "X" && bC == "") {
          clickBox(c);
          moveMade = true;
          break;
        }
        if (bA == "X" && bC == "X" && bB == "") {
          clickBox(b);
          moveMade = true;
          break;
        }
        if (bB == "X" && bC == "X" && bA == "") {
          clickBox(a);
          moveMade = true;
          break;
        }
      }
    }

    // 3. RANDOM: अगर जीतने या हारने का खतरा नहीं है, तो रैंडम चलो
    if (!moveMade) {
      let emptyIndices = [];
      Array.from(boxtexts).forEach((element, index) => {
        if (element.innerText === "") emptyIndices.push(index);
      });

      if (emptyIndices.length > 0) {
        // बीच वाला बॉक्स (Index 4) सबसे अच्छा होता है, अगर खाली है तो ले लो
        if (emptyIndices.includes(4)) {
          clickBox(4);
        } else {
          let randomIndex =
            emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          clickBox(randomIndex);
        }
      }
    }
  }, 500); // 0.5 sec delay thinking time
};

// Helper function to click a box programmatically
const clickBox = (index) => {
  let box = document.getElementsByClassName("box")[index];
  let boxtext = box.querySelector(".boxtext");

  boxtext.innerText = turn;
  turn = changeTurn();
  checkWin();
  if (!isgameover) {
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  }
};

// --- MAIN GAME LOOP ---
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");

  element.addEventListener("click", () => {
    // Player Click
    if (boxtext.innerText === "" && !isgameover) {
      // अगर AI Mode है और 'O' की बारी है तो क्लिक मत करने दो
      if (isAiMode && turn === "O") return;

      boxtext.innerText = turn;
      turn = changeTurn();
      checkWin();

      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;

        // Trigger AI Turn
        if (isAiMode && turn === "O") {
          computerMove();
        }
      }
    }
  });
});

// --- BUTTONS ---
const resetGame = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });

  // Background Reset
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => (box.style.backgroundColor = ""));

  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
};

document.getElementById("reset").addEventListener("click", resetGame);

// Mode Toggle Button
const modeBtn = document.getElementById("modeBtn");
modeBtn.addEventListener("click", () => {
  isAiMode = !isAiMode;

  if (isAiMode) {
    modeBtn.innerText = "Mode: Player vs Smart AI";
    modeBtn.style.background = "linear-gradient(45deg, #00ff88, #00cc66)";
  } else {
    modeBtn.innerText = "Mode: Player vs Player";
    modeBtn.style.background = "linear-gradient(45deg, #ff0055, #ff5500)";
  }
  resetGame();
});
