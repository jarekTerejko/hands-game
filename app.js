const game = () => {
  // zmienne uzywane przez więcej niz jedną funkcje
  let playerScore = 0;
  let computerScore = 0;
  const infoMsg = document.querySelector(".info");

  // utowrznie buttona resetującego
  const createBtn = () => {
    const playAgainBtn = document.createElement("button");
    playAgainBtn.classList.add("reset");
    playAgainBtn.textContent = "Play Again";
    return playAgainBtn;
  };

  // zmiana UI
  const startGameUI = () => {
    const startGameBtn = document.querySelector(".start-game");
    const welcomeScreen = document.querySelector(".welcome");
    const gameRounds = document.querySelector(".game-rounds");
    const scoreBoard = document.querySelector(".score-board");
    // ekran startowy znika, pojawiają sie rece
    startGameBtn.addEventListener("click", () => {
      welcomeScreen.classList.add("fade-out");
      gameRounds.classList.add("fade-in");
      gameRounds.classList.remove("fade-out");
      scoreBoard.classList.add("fade-in");
    });
  };

  const playGame = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    // event listener usuwa animacje po ich ukończniu
    hands.forEach(hand => {
      hand.addEventListener("animationend", e => {
        // console.log(e.target);
        e.target.style.animation = "";
      });
    });

    // tablica do porównania wyboru playera i losowego wyboru komputera
    const computerOptions = ["rock", "paper", "scissors"];

    // dodanie do buttonów listenerów na click
    options.forEach(option => {
      option.addEventListener("click", function() {
        const computerRandomNum = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerRandomNum];
        // UI rece jako kamień
        playerHand.src = `img/rock.png`;
        computerHand.src = `img/rock.png`;
        // zatrzymanie mozłiwośći ponownego kilkniecie przed ukończniem animacji i updatem UI
        options.forEach(option => {
          option.disabled = true;
        });
        // komunikat
        infoMsg.textContent = "...";
        // animacja
        playerHand.style.animation = "blurPlayerHand 2s ease";
        computerHand.style.animation = "blurComputerHand 2s ease";

        // funcja wykonuje sie po 2s kiedy animacja dobiegnie końca
        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          // wyświetlenie obrazów - wybranych/wylosowanych
          playerHand.src = `img/${this.textContent}.png`;
          computerHand.src = `img/${computerChoice}.png`;
          // jesli player lub computer osiągneli score 3
          if (playerScore === 3 || computerScore === 3) {
            // po sukundzie...
            setTimeout(() => {
              // zmiana obrazkow na kamień
              playerHand.src = `img/rock.png`;
              computerHand.src = `img/rock.png`;
              // ukrycie buttonów z wyborem
              options.forEach(option => {
                option.style.display = "none";
              });
              // utworzenie buttona do resetu
              const btn = createBtn();
              // wyświetlenie buttona w UI
              document.querySelector(".options").appendChild(btn);
              // klikniecie na buttona powoduje...
              btn.addEventListener("click", () => {
                // ...usunięcie go
                btn.remove();
                // ...wyswietlenie komunikatu o możliwości ponownego wyboru
                infoMsg.textContent = "Choose an option";
                // ... reset zgormadzonych przez Playera i Computer punktów
                playerScore = 0;
                computerScore = 0;
                updateScore();
                // ... ponowne wyświetlenie buttonów z wyborem
                options.forEach(option => {
                  option.disabled = false;
                  option.style.display = "block";
                });
              });
              // wywietlenie komunikatu o zwycięzcy w zależnoście ktory pierwszy osiągnął 3 zwycięzstwa
              if (playerScore > computerScore) {
                infoMsg.textContent = "Player Wins Game!";
              } else {
                infoMsg.textContent = "Computer Wins Game!";
              }
            }, 1000);
          } else {
            // jeśli ani player ani computer nie zgromadzili 3 zwycięstw przywrocenie aktywności buttonow
            options.forEach(option => {
              option.disabled = false;
            });
          }
        }, 2000);
      });
    });
  };

  // funkcja uaktualniająca UI po każdej rundzie
  const updateScore = () => {
    const playerScoreUI = document.querySelector(".player-score p");
    const computerScoreUI = document.querySelector(".computer-score p");

    playerScoreUI.textContent = playerScore;
    computerScoreUI.textContent = computerScore;
  };

  // funkcja porownująca wybor playera z losowym wyborem computera
  const compareHands = (playerChoice, computerChoice) => {
    // remis
    if (playerChoice === computerChoice) {
      infoMsg.textContent = "Draw!";
      return;
    }

    // player wybiera rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        infoMsg.textContent = "Player Wins!";
        playerScore++;
        updateScore();
        return;
      } else {
        infoMsg.textContent = "Computer Wins!";
        computerScore++;
        updateScore();
        return;
      }
    }

    // player wybiera paper
    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        infoMsg.textContent = "Player Wins!";
        playerScore++;
        updateScore();
        return;
      } else {
        infoMsg.textContent = "Computer Wins!";
        computerScore++;
        updateScore();
        return;
      }
    }

    // player wybiera scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "paper") {
        infoMsg.textContent = "Player Wins!";
        playerScore++;
        updateScore();
        return;
      } else {
        infoMsg.textContent = "Computer Wins!";
        computerScore++;
        updateScore();
      }
    }
  };

  // wywoałania funkcji
  startGameUI();
  playGame();
};

game();
