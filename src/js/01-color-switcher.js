function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const ref = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let intervalId = null;
setLocalStorageBodyColor();

ref.start.addEventListener('click', onChangeColor);
ref.stop.addEventListener('click', disableBodyColorChanger);

function onChangeColor(e) {
  const isActiveBtn = document.querySelector('.isActive');

  if (isActiveBtn) {
    return;
  }
  ref.start.classList.add('isActive');
  intervalId = setInterval(() => {
    let color = getRandomHexColor();
    ref.body.style.backgroundColor = color;
    localStorage.setItem('color', color);
  }, 1000);
}

function disableBodyColorChanger(e) {
  clearInterval(intervalId);
  ref.start.classList.remove('isActive');
}
function setLocalStorageBodyColor() {
  const localBodyColor = localStorage.getItem('color');
  if (localBodyColor) {
    ref.body.style.backgroundColor = localBodyColor;
  }
}
