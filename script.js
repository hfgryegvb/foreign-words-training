"use strict";

const currentWord = document.querySelector('#current-word');
const totalWord = document.querySelector('#total-word');
const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front h1');
const cardBack = document.querySelector('#card-back h1');
const cardExample = document.querySelector('#card-back span');
const buttonExam = document.querySelector('#exam');
const buttonBack = document.querySelector('#back');
const buttonNext = document.querySelector('#next');
let wordsIterator = 0;
const cardsContainer = document.querySelector('#exam-cards');
const slider = document.querySelector('.slider-controls');
const studyMode = document.querySelector('#study-mode');
const examMode = document.querySelector('#exam-mode');
const wordProgress = document.querySelector('#words-progress')



const words = { frontWord: ['school', 'food', 'staff', 'Book', 'Coffee', 'farm', 'Cat', 'friend', 'letter', 'girl'], translate: ['школа', 'еда', 'штат', 'Книга', 'Кофе', 'ферма', 'Кот', 'друг', 'письмо', 'девочка'], example: ['school is the best place', 'food is necessary for humans', 'staff at work is staffed', 'reading books is interesting', 'I drink coffee in the morning', 'delicious berries on the farm', 'red cat my friend', 'a man needs a friend', 'I wrote a letter', 'the girl is very beautiful'] };


cardFront.textContent = words.frontWord[0];
cardBack.textContent = words.translate[0];
cardExample.textContent = words.example[0];
currentWord.textContent = 1;
const array = words.frontWord.length;
totalWord.textContent = array;


//подсчет прогресса для режима тренировки
function getWordProgress(i) {
  return (100 * (i + 1)) / array;
}

buttonNext.addEventListener('click', () => {
  if (wordsIterator >= array - 1) {
    return;
  } else {
    wordsIterator++;
    currentWord.textContent = wordsIterator + 1;
    cardFront.textContent = words.frontWord[wordsIterator];
    cardBack.textContent = words.translate[wordsIterator];
    cardExample.textContent = words.example[wordsIterator];
    buttonBack.disabled = false;
    wordProgress.value = getWordProgress(wordsIterator);
    if (wordsIterator >= array - 1) {
      buttonNext.disabled = true;
    }
  }

})
buttonBack.addEventListener('click', () => {
  if (wordsIterator <= 0) {
    return;
  } else {
    wordsIterator--;
    currentWord.textContent = wordsIterator + 1;
    cardFront.textContent = words.frontWord[wordsIterator];
    cardBack.textContent = words.translate[wordsIterator];
    cardExample.textContent = words.example[wordsIterator];
    buttonNext.disabled = false;
    wordProgress.value = getWordProgress(wordsIterator);
    if (wordsIterator <= 0) {
      buttonBack.disabled = true;
    }
  }

})

//переворачивание карточек
flipCard.addEventListener('click', () => {
  if (flipCard.classList.contains('active')) {
    flipCard.classList.remove('active');
  } else {
    flipCard.classList.add('active');
  }

})


let ssec = 0;
let min = 0;
const timeClock = document.querySelector('#time');
let time;
buttonExam.addEventListener('click', () => {
  time = setInterval(() => {
    ssec++;
    if (ssec == 60) {
      ssec = 0;
      min++;
    }
    if (ssec < 10) {
      timeClock.textContent = min + ':0' + ssec;
    } else {
      timeClock.textContent = min + ':' + ssec;
    }


  }, 1000)


  //скрытие-показ элементов .hidden
  flipCard.hidden = true;
  slider.hidden = true;
  examMode.classList.remove('hidden');
  studyMode.hidden = true;


  const cardDiv = cardsContainer.children;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array * 2; i++) {
    if (i < array) {
      const firstCard = document.createElement('div');
      firstCard.classList.add('card');
      firstCard.textContent = words.translate[i];
      cardsContainer.append(firstCard);
    } else {
      const firstCard = document.createElement('div');
      firstCard.classList.add('card');
      firstCard.textContent = words.frontWord[i - array];
      cardsContainer.append(firstCard);
    }

    while (cardDiv.length) {
      fragment.appendChild(cardDiv[Math.floor(Math.random() * cardDiv.length)]);
    }
    cardsContainer.appendChild(fragment);
  }
})



let click = false;
let finish = 0;
let oneCard = 0;
let indexOneCard = 0;
let twoCard = 0;
let indexTwoCard = 0;


cardsContainer.addEventListener('click', (event) => {
  let examCard = event.target.closest('.card');
  if (click == false) {
    examCard.classList.add('correct');
    oneCard = examCard;
    indexOneCard = words.frontWord.indexOf(examCard.textContent);
    if (indexOneCard == -1) {
      indexOneCard = words.translate.indexOf(examCard.textContent);
    }
    click = true;

  } else if (click == true) {
    twoCard = examCard;
    indexTwoCard = words.frontWord.indexOf(examCard.textContent);
    if (indexTwoCard == -1) {
      indexTwoCard = words.translate.indexOf(examCard.textContent);
    }
    if (indexOneCard == indexTwoCard) {
      finish++;
      twoCard.classList.add('correct');
      oneCard.classList.add('fade-out');
      twoCard.classList.add('fade-out');
      if (finish == array) {
        alert(`Все верно! Ваше время ${timeClock.textContent}`);
        clearInterval(time);
      }
      click = false;
    } else if (indexOneCard != indexTwoCard) {
      click = false;
      twoCard.classList.add('wrong');
      setTimeout(() => {
        oneCard.classList.remove('correct');
        twoCard.classList.remove('wrong');
      }, 500);
    }
  }
})