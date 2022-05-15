import Notiflix from 'notiflix';

const ref = {
  form: document.querySelector(`.form`),
  delay: document.querySelector(`[name = "delay"]`),
  step: document.querySelector(`[name="step"]`),
  amount: document.querySelector(`[name = "amount"]`),
};

ref.form.addEventListener('submit', submitFormData);

function submitFormData(e) {
  e.preventDefault();
  let DELAY = Number(ref.delay.value);
  let STEP = Number(ref.step.value);
  let AMOUNT = Number(ref.amount.value);

  for (let i = 0; i < AMOUNT; i++) {
    let position = i + 1;

    createPromise(position, DELAY)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });
    DELAY += STEP;
  }
  ref.form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
