const playerOne = document.querySelectorAll('.player-1');
const playerTwo = document.querySelectorAll('.player-2');
const playerThree = document.querySelectorAll('.player-3');
const playerFour = document.querySelectorAll('.player-4');
const playerSelect = document.querySelector('#player-select');
const dices = document.querySelectorAll('.dice');
// functions to fix point
function fixPoint(element) {
  element.classList.add('fixed');
  document.querySelector('.current-player.subtotal').innerHTML = calcSubTotal();
  const subTotalValue = parseInt(
    document.querySelector('.current-player.subtotal').innerHTML
  );
  if (subTotalValue >= 63) {
    document.querySelector('.current-player.bonus').innerHTML = 35;
  }
  document.querySelector('.current-player.total').innerHTML = calcTotal();
}
// functions to change active player
function deactivatePlayer(elements) {
  for (element of elements) {
    element.classList.remove('current-player');
    if (!element.classList.contains('fixed')) {
      element.innerHTML = '';
    }
  }
}
function activatePlayer(elements) {
  for (element of elements) {
    element.classList.add('current-player');
    element.addEventListener('click', (e) => fixPoint(e.target));
  }
}
function changeCurrentPlayer() {
  deactivatePlayer(playerOne);
  deactivatePlayer(playerTwo);
  deactivatePlayer(playerThree);
  deactivatePlayer(playerFour);
  const num = playerSelect.value;
  switch (num) {
    case '1':
      activatePlayer(playerOne);
      break;
    case '2':
      activatePlayer(playerTwo);
      break;
    case '3':
      activatePlayer(playerThree);
      break;
    case '4':
      activatePlayer(playerFour);
      break;
    default:
      break;
  }
}
// functions to calculate score of dices
function calcAces() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '1' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcDeuces() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '2' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcThrees() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '3' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcFours() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '4' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcFives() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '5' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcSixes() {
  let value = 0;
  dices.forEach((dice) =>
    dice.value === '6' ? (value += parseInt(dice.value)) : null
  );
  if (value === 0) {
    return 0;
  }
  return value;
}
function calcChoice() {
  let value = 0;
  dices.forEach((dice) => (value += parseInt(dice.value)));
  return value;
}
function calcYacht() {
  const uniqueNumberArray = Array.from(dices)
    .map((dice) => parseInt(dice.value))
    .reduce((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), []);
  if (uniqueNumberArray.length === 1) {
    return 50;
  } else {
    return 0;
  }
}
function calcLargeStraight() {
  const uniqueNumberArray = Array.from(dices)
    .map((dice) => parseInt(dice.value))
    .reduce((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), [])
    .sort((a, b) => a - b);
  if (uniqueNumberArray.length != 5) {
    return 0;
  }
  for (let i = 0; i < uniqueNumberArray.length - 1; i++) {
    const dif = uniqueNumberArray[i + 1] - uniqueNumberArray[i];
    if (dif != 1) {
      return 0;
    }
  }
  return 30;
}

function calcSmallStraight() {
  const uniqueNumberArray = Array.from(dices)
    .map((dice) => parseInt(dice.value))
    .reduce((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), [])
    .sort((a, b) => a - b);
  if (uniqueNumberArray.length < 4) {
    console.log('fail');
    return 0;
  }
  for (let i = 0; i < uniqueNumberArray.length - 1; i++) {
    const dif = uniqueNumberArray[i + 1] - uniqueNumberArray[i];
    if (dif != 1) {
      return 0;
    }
  }
  return 15;
}
// ? look into this function
function calcFourOfKind() {
  const uniqueNumberArray = Array.from(dices).map((dice) =>
    parseInt(dice.value)
  );
  const counter = uniqueNumberArray.reduce((acc, o) => {
    acc[o] = acc[o] + 1 || 1;
    return acc;
  }, {});
  const isFourOfAKind = Object.values(counter).includes(4);
  const isFiveOfAKind = Object.values(counter).includes(5);
  if (isFourOfAKind || isFiveOfAKind) {
    let value = 0;
    dices.forEach((dice) => (value += parseInt(dice.value)));
    return value;
  }
  return 0;
}
function calcFullHouse() {
  const uniqueNumberArray = Array.from(dices).map((dice) =>
    parseInt(dice.value)
  );
  const counter = uniqueNumberArray.reduce((acc, o) => {
    acc[o] = acc[o] + 1 || 1;
    return acc;
  }, {});
  const isThreeOfAKind = Object.values(counter).includes(3);
  const isTwoOfAKind = Object.values(counter).includes(2);
  if (isThreeOfAKind && isTwoOfAKind) {
    let value = 0;
    dices.forEach((dice) => (value += parseInt(dice.value)));
    return value;
  }
  return 0;
}
function calcTotal() {
  const points = document.querySelectorAll('.current-player.fixed.sum');
  console.log(points);
  let totalPoints = 0;
  points.forEach((point) => (totalPoints += parseInt(point.innerHTML)));
  return totalPoints;
}
function calcSubTotal() {
  const points = document.querySelectorAll('.current-player.fixed.sub');
  let totalPoints = 0;
  points.forEach((point) => (totalPoints += parseInt(point.innerHTML)));
  return totalPoints;
}
// function to change score on screen
function changeScore() {
  try {
    document.querySelectorAll(
      '.aces.current-player:not(.fixed)'
    )[0].innerHTML = calcAces();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.deuces:not(.fixed)'
    )[0].innerHTML = calcDeuces();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.threes:not(.fixed)'
    )[0].innerHTML = calcThrees();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.fours:not(.fixed)'
    )[0].innerHTML = calcFours();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.fives:not(.fixed)'
    )[0].innerHTML = calcFives();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.sixes:not(.fixed)'
    )[0].innerHTML = calcSixes();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.choice:not(.fixed)'
    )[0].innerHTML = calcChoice();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.four-of-kind:not(.fixed'
    )[0].innerHTML = calcFourOfKind();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.full-house'
    )[0].innerHTML = calcFullHouse();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.small-straight:not(.fixed)'
    )[0].innerHTML = calcSmallStraight();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.large-straight:not(.fixed)'
    )[0].innerHTML = calcLargeStraight();
  } catch (e) {}
  try {
    document.querySelectorAll(
      '.current-player.yacht:not(.fixed)'
    )[0].innerHTML = calcYacht();
  } catch (e) {}
}
// init script
function init() {
  playerSelect.addEventListener('change', changeCurrentPlayer);
  playerSelect.addEventListener('change', changeScore);
  dices.forEach((dice) => dice.addEventListener('change', changeScore));
  changeCurrentPlayer();
  changeScore();
}
init();
