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
let again = document.querySelector('.play-again');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

startGame();

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
  matchedCards = [];
  cards = shuffle(cards);

  for (let card of cards) {
    cards.forEach(function(card) {
        deck.append(card);
        card.classList.remove('open', 'show', 'match', 'unmatch', 'disabled');
    });
  };
  resetMoves();
  resetScore();
  resetTimer();
}

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

//Event Listeners
for (let card of cards) {
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openCard);
    card.addEventListener('click', gameEnd);
}

//Toggles classes
function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

//opens cards and checks if they match or not
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

//counts moves
function movesCounter() {
  moves++;
  movesCount.innerHTML = moves;
  if (moves === 1){
    startTimer();
  }
  rating();
}

//adds matching cards to matchedCards, cleans openCards
function matched() {
  openCards[0].classList.add('match', 'disabled');
  openCards[1].classList.add('match', 'disabled');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  matchedCards.push(openCards[0], openCards[1]);
  openCards = [];
}

//unmatches cards, flips them back
function unmatched() {
  openCards[0].classList.add('no-match');
  openCards[1].classList.add('no-match');
  disable();
  //sets interval to delay running code
  setTimeout (function() {
    openCards[0].classList.remove('show', 'open', 'no-match');
    openCards[1].classList.remove('show', 'open', 'no-match');
    enable();
    openCards = [];
  }, 500);
}

//prevents from clicking the cards
function disable() {
  for (let card of cards) {
    card.classList.add('disabled');
  }
}

//enables clicking the cards and prevents from clicking the matched cards
function enable() {
  for (let card of cards) {
    card.classList.remove('disabled');
  }
  for (let matchedCard of matchedCards) {
    matchedCard.classList.add('disabled');
  }
}

//starts timer
function startTimer() {
  time = setInterval(function() {
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

//stops timer
function stopTimer() {
  clearInterval(time);
}

//sets star rating (based on number of moves)
function rating() {
  if (moves > 10 && moves <= 14) {
    stars[2].classList.remove('fa-star');
  } else if (moves > 14) {
    stars[1].classList.remove('fa-star');
  }
}

//resets moves
function resetMoves() {
  moves = 0;
  movesCount.innerHTML = moves;
}

//resets timer
function resetTimer() {
  sec = 0;
  min = 0;
  timer.innerHTML = '00:00';
  stopTimer();
}

//resets score
function resetScore() {
  for (let star of stars) {
    star.classList.add('fa-star');
  }
}

//restarts game
restart.addEventListener('click', function() {
  startGame();
});

//ends game - popup window with congratulations (modal)
function gameEnd() {
  if (matchedCards.length === 16) {
    stopTimer();
    let finalTime = timer.innerHTML;
    //shows congratulations popup window
    modal.style.display = "block";

    let totalScore = document.querySelector('.stars').innerHTML;
    document.querySelector('#final-score').innerHTML = totalScore;

    let totalMoves = document.querySelector(".moves").innerHTML;
    document.querySelector('#final-moves').innerHTML = totalMoves;

    let totalTime = document.querySelector(".timer").innerHTML;
    document.querySelector('#final-time').innerHTML = totalTime;

    playAgain();
    closePopUp();
  }
}

//closes popup window, starts new game
function closePopUp() {
  close.addEventListener('click', function(event) {
    modal.style.display = "none";
    startGame();
  });
}

//starts new game (play again button)
function playAgain() {
again.addEventListener('click', function(event) {
    modal.style.display = "none";
    startGame();
  });
}
