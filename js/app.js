/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');
let card = deck.querySelectorAll('.card');
let cards = [...card];
let openCards = [];
let matchedCards = [];
let moves = 0;
let movesCount = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');
let timer = document.querySelector('.timer');
let time;
let sec = 0, min = 0;
let modal = document.querySelector('.modal');
let totalMoves = document.querySelector('#final-moves');
let totalTime = document.querySelector('#final-time');
let totalScore = document.querySelector('#final-score');
let close = document.querySelector('.close');
let restart = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//Shuffles cards, removes all cards' classes

function startGame() {
  cards = shuffle(cards);

  for (let card of cards) {
    cards.forEach(function(card) {
        deck.append(card);
        card.classList.remove('open', 'show', 'match', 'unmatch');
    });
  };
  resetMoves();
  // resetScore();
  // resetTimer();
}

startGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


for (let card of cards) {
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openCard);
    // card.addEventListener('click', modal);
}

function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

function openCard() {
  openCards.push(this);
  if (openCards.length === 1) {
    movesCounter();
  } else if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      matched();
    } else {
      unmatched();
    }
  }
}

function movesCounter() {
  moves++;
  movesCount.innerHTML = moves;
  if (moves === 1){
    startTimer();
  }
  rating();
}

function matched() {
  openCards[0].classList.add('match', 'disabled');
  openCards[1].classList.add('match', 'disabled');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  matchedCards.push(openCards[0], openCards[1]);
  openCards = [];
  console.log(matchedCards);
}

function unmatched() {
  openCards[0].classList.add('no-match');
  openCards[1].classList.add('no-match');
  disable();
  //sets interval to delay running code
  setTimeout (function() {
    openCards[0].classList.remove('show', 'open', 'no-match');
    openCards[1].classList.remove('show', 'open', 'no-match');
    openCards = [];
    enable();
  }, 1000);
}

function disable() {
  for (let card of cards) {
    card.classList.add('disabled');
  }
}

function enable() {
  for (let card of cards) {
    card.classList.remove('disabled');
  }
  for (let matchedCard of matchedCards) {
    matchedCard.classList.add('disabled');
  }
}

function startTimer() {
  let time = setInterval(function() {
    sec++;
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min === 0) {
      min = "00";
    }
    if (sec === 59) {
      min++;
      if (min < 10) {
        min = "0" + min;
      }
      sec = 0;
    }
    timer.innerHTML = min + ":" + sec;
  }, 1000);
}

function stopTimer() {
  clearInterval(time);
}

function rating() {
  if (moves > 8 && moves <= 12) {
    stars[2].classList.remove('fa-star');
  } else if (moves > 12) {
    stars[1].classList.remove('fa-star');
  }
}

function restartGame() {
  restart.addEventListener('click', function() {
    startGame();
  });
}

// The modal - pop up window with congratulations
function gameEnd() {
  if (matchedCards === 16) {
    stopTimer();
    let finalTime = timer.innerHTML;
    //shows congratulations pop up window
    modal.style.display = "block";

    let starsScore = document.querySelector('.stars').innerHTML;

    totalMoves = moves;
    totalTime = finalTime;
    totalScore = starsScore;

    // closePopUp();
  }
}

// function closePopUp() {
//   close.addEventListener('click', function(event) {
//     modal.style.display = "none";
//     startGame();
//   });
// }

// function playAgain() {
// restart.addEventListener('click', function(event) {
//     modal.style.display = "none";
//     startGame();
//   });
// }

function resetMoves() {
  moves = 0;
  movesCount.innerHTML = moves;
}
//
// function resetTimer() {
//   sec = 0;
//   min = 0;
//   timer.innerHTML = '00:00';
//   stopTimer();
//   // może lepiej po prostu clearInterval(time)
// }
//
// function resetScore() {
//   for (let star of stars) {
//     star.classList.add('fa-star');
//   }
// }
