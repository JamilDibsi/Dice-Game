'use strict';

// selecting items
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const corrent0El = document.getElementById('current--0');
const corrent1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// starting conditions

let correntScore, activePlayer, score, playing 

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  corrent0El.textContent = 0;
  corrent1El.textContent = 0;
  correntScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
};

init()

const switchPlayer = function () {
  correntScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

// roll functionality
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check part
    if (dice !== 1) {
      // add dice to corrent score and display it
      correntScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        correntScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});
// hold functionality
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += correntScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNewEl.addEventListener('click', init);
