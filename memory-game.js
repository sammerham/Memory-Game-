"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
const COUNTER = document.getElementById('counter');
const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

let card1 = null;
let card2 = null;
let matchingCards = 0;
let counter = 0;
let noClicking = false;

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    const card = document.createElement("div");
    card.setAttribute('class', color);
    gameBoard.append(card)
    card.addEventListener("click", handleCardClick);
  }
};
// check if we we have a win; if matching cards counter is === to the length of array colors.
  // add set time out to make sure last card flips; 
    // alret annoucing game over and refreshing the entire page to reset the game.
function checkForWin() {
  if (matchingCards === COLORS.length) {
    setTimeout(() => {
      alert("Game over!")
      window.location.reload()
    }, 500);
  }
};

// reset cards to null and counter to zero
function reset(){
  card1 = null;
  card2 = null;
  counter = 0;
  noClicking= false;
}
/** Flip a card face-up. */

function unFlipCard() {
  card1.removeEventListener('click', handleCardClick);
  card2.removeEventListener('click', handleCardClick);
  matchingCards += 2;
  reset();
}

/** Flip a card face-down. */

function flipCard() {
  setTimeout(() => {
    card1.style.backgroundColor = "white";
    card2.style.backgroundColor = "white";
    reset();
  }, FOUND_MATCH_WAIT_MSECS);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // if counter is equal to 0 , we update card1; counter will be 1;
  // if counter is equal to 1, we update card2 ; counter will be 2;
  //compare classes for card 1 and card2;
  //if match, keep card flipped(showing colors); - can be 
    // call unflip cards
        // Reset the counter to zero and reset cards (1 & 2 ) to null (reset function)
        // increment matching cards counter by 2;
  // else, call flipp cards
        // wait one second and flipp back (white); 
        // remove the color class.
        // Reset the counter to zero and reset cards (1 & 2 ) to null. (reset function)
  //at the end check for win function to check if you have a winner 
  if (noClicking) return;
  let currentCard = evt.target;
  let color = currentCard.getAttribute("class")
  currentCard.style.backgroundColor = color;
  if (counter === 0) {
    card1 = currentCard;
    counter = 1;
  } else if (counter === 1) {
    card2 = currentCard;
    counter = 2;
    noClicking = true;
    if (card1.className === card2.className) {
      unFlipCard()
    } else {
      flipCard()
    }
  }
  checkForWin()
};
