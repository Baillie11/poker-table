const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];
let step = 0; // Track dealing steps

function getDeck() {
  const newDeck = [];
  for (let s of suits) {
    for (let v of values) {
      newDeck.push(v + s);
    }
  }
  return newDeck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function getColouredCard(card) {
  const suit = card.slice(-1);
  const isRed = suit === '♥' || suit === '♦';
  return `<span style="color:${isRed ? 'red' : 'black'}">${card}</span>`;
}

function resetTable() {
  deck = shuffle(getDeck());
  step = 0;

  // Clear all community cards
  document.querySelectorAll('.community-cards .card').forEach(card => {
    card.innerHTML = '';
  });

  // Clear all player cards
  for (let p = 1; p <= 6; p++) {
    const cards = document.querySelectorAll(`.seat${p} .player-cards .card`);
    cards.forEach(card => card.innerHTML = '');
  }

  // Reset pot
  document.querySelector('.pot').innerHTML = 'Pot: $0';
}

function dealStep() {
  if (step === 0) {
    // Pre-flop: Deal 2 cards to each player
    for (let p = 1; p <= 6; p++) {
      const cards = document.querySelectorAll(`.seat${p} .player-cards .card`);
      cards[0].innerHTML = getColouredCard(deck.pop());
      cards[1].innerHTML = getColouredCard(deck.pop());
    }

  } else if (step === 1) {
    // Flop
    const community = document.querySelectorAll('.community-cards .card');
    for (let i = 0; i < 3; i++) {
      community[i].innerHTML = getColouredCard(deck.pop());
    }

  } else if (step === 2) {
    // Turn
    const community = document.querySelectorAll('.community-cards .card');
    community[3].innerHTML = getColouredCard(deck.pop());

  } else if (step === 3) {
    // River
    const community = document.querySelectorAll('.community-cards .card');
    community[4].innerHTML = getColouredCard(deck.pop());

  } else {
    alert('Round complete! Press Reset to start a new hand.');
  }

  step++;
}

// Attach button actions
document.querySelector('.deal-button').onclick = dealStep;
document.querySelector('.reset-button').onclick = resetTable;
