document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const resetButton = document.getElementById('reset-button');
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  let score = 0;
  let timer = 0;
  let timerInterval;

  const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

  function initializeGame() {
      score = 0;
      timer = 0;
      flippedCards = [];
      matchedCards = [];
      gameBoard.innerHTML = '';
      scoreDisplay.textContent = `Score: ${score}`;
      timerDisplay.textContent = `Time: ${timer}s`;

      // Shuffle cards
      cards = cardValues.sort(() => 0.5 - Math.random());

      // Create card elements
      cards.forEach((value, index) => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.dataset.value = value;
          card.dataset.index = index;
          card.textContent = ''; // Initially, the card text is hidden
          card.addEventListener('click', flipCard);
          gameBoard.appendChild(card);
      });

      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
          timer++;
          timerDisplay.textContent = `Time: ${timer}s`;
      }, 1000);
  }

  function flipCard(event) {
      const card = event.target;

      // Prevent flipping more than two cards and flipping matched cards
      if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
          card.classList.add('flipped');
          card.textContent = card.dataset.value;
          flippedCards.push(card);

          if (flippedCards.length === 2) {
              setTimeout(checkForMatch, 1000); // Wait for 1 second before checking for a match
          }
      }
  }

  function checkForMatch() {
      const [card1, card2] = flippedCards;

      if (card1.dataset.value === card2.dataset.value) {
          score++;
          scoreDisplay.textContent = `Score: ${score}`;
          card1.classList.add('matched');
          card2.classList.add('matched');
          matchedCards.push(card1, card2);
      } else {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          card1.textContent = '';
          card2.textContent = '';
      }

      flippedCards = [];

      if (matchedCards.length === cards.length) {
          clearInterval(timerInterval);
          alert(`Congratulations! You completed the game in ${timer} seconds.`);
      }
  }

  resetButton.addEventListener('click', initializeGame);

  initializeGame();
});
