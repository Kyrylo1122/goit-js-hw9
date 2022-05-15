import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const startBtn = document.querySelector('[data-start]');
const value = {
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};
const dateInput = document.querySelector('#datetime-picker');
let intervalId = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,

//   onClose(selectedDates) {
//     const delta = selectedDates[0] - options.defaultDate;

//     if (delta < 0) {
//       Notiflix.Notify.warning('Please choose a date in the future');
//       return;
//     }

//     startBtn.disabled = false;

//     startBtn.addEventListener('click', () => {
//       dateInput.disabled = true;
//       startBtn.disabled = true;

//       const intervalId = setInterval(() => {
//         const currentData = new Date();
//         const deltaSecond = selectedDates[0] - currentData;

//         if (deltaSecond < 0) {
//           Notiflix.Notify.success('Your timer is finished');

//           clearInterval(intervalId);
//           return;
//         }

//         const { days, hours, minutes, seconds } = convertMs(deltaSecond);
//         updateClockFace(days, hours, minutes, seconds);
//       }, 1000);
//     });
//   },
// };
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const delta = selectedDates[0] - options.defaultDate;
    if (delta < 0) {
      Notiflix.Notify.warning('Please choose a date in the future');

      return;
    }

    startBtn.disabled = false;

    startBtn.addEventListener('click', () => {
      disableStartBtn();
      disableInput();
      intervalId = setInterval(intervalFunction, 1000, selectedDates[0]);
    });
  },
};

function disableInput() {
  dateInput.disabled = true;
}
function disableStartBtn() {
  startBtn.disabled = true;
}
function intervalFunction(arg) {
  console.log('arg', arg);
  const currentData = new Date();
  const deltaSecond = arg - currentData;

  finishCountingTimer(deltaSecond);
  const { days, hours, minutes, seconds } = convertMs(deltaSecond);
  updateClockFace(days, hours, minutes, seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace(days, hours, minutes, seconds) {
  value.day.textContent = `${days}`;
  value.hour.textContent = `${hours}`;
  value.minute.textContent = `${minutes}`;
  value.second.textContent = `${seconds}`;
}

function finishCountingTimer(arg) {
  if (arg <= 1000) {
    Notiflix.Notify.success('Your timer is finished');

    clearInterval(intervalId);
    return;
  }
}

flatpickr('#datetime-picker', options);
