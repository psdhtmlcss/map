'use strict';
const DeckCount = {
  oh: 88,
  habitat: 87,
  resource: 130
};
const deckTypes = document.querySelector('.js-deck-types');
const selectedDeck = document.querySelector('.js-selected-deck');
const step2 = document.querySelector('.js-step-2');
const chooseRandomlyButton = step2.querySelector('.js-choose-randomly');
const clearButton = step2.querySelector('.js-clear');
const input = step2.querySelector('.js-count');
const getCardButton = step2.querySelector('.js-get-card-button');
const selectedCards = step2.querySelector('.js-selected-cards');
const maxCount = step2.querySelector('.js-max-count');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const toggleStep2 = (style) => {
  step2.style.display = style;
};

const clearSelectedCards = () => {
  selectedCards.innerHTML = '';
};

const onChooseRandomlyButtonClick = (evt) => {
  const number = getRandomInt(1, Number(evt.target.dataset.count));
  const deckName = evt.target.dataset.name;
  selectedCards.insertAdjacentHTML('afterbegin', `<div class="card-item"><h3>Карта номер ${number}</h3><img src="${deckName}/c${number}.jpg"></div>`);
};

const onGetCardButtonClick = (evt) => {
  const number = Number(input.value);
  const deckName = evt.target.dataset.name;
  selectedCards.insertAdjacentHTML('afterbegin', `<div class="card-item"><h3>Карта номер ${number}</h3><img src="${deckName}/c${number}.jpg"></div>`)
  input.value = '';
};

const toggleActiveClass = (btn) => {
  const activeBtn = deckTypes.querySelector('.active');
  if (activeBtn) {
    activeBtn.classList.remove('active');
  }
  btn.classList.add('active');
};

const onDeckTypesClick = (evt) => {
  if (!evt.target.classList.contains('button')) {
    return;
  }
  toggleActiveClass(evt.target);
  selectedDeck.textContent = evt.target.textContent;
  toggleStep2('block');
  chooseRandomlyButton.dataset.count = DeckCount[evt.target.id];
  chooseRandomlyButton.dataset.name = evt.target.id;
  chooseRandomlyButton.removeEventListener('click', onChooseRandomlyButtonClick);
  chooseRandomlyButton.addEventListener('click', onChooseRandomlyButtonClick);
  input.max = DeckCount[evt.target.id];
  maxCount.textContent = DeckCount[evt.target.id];
  getCardButton.dataset.name = evt.target.id;
  getCardButton.addEventListener('click', onGetCardButtonClick);
};

deckTypes.addEventListener('click', onDeckTypesClick);
clearButton.addEventListener('click', clearSelectedCards);