const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

(() => {

  try {
    const test = document.createElement('div')
    test.style.background = 'conic-gradient(red, blue)';
    document.body.appendChild(test);
    const styles = window.getComputedStyle(test);
    if (styles.backgroundImage === 'none') {
      document.body.classList.add('no-gradient');
      document.body.removeChild(test);
    }
  } catch(e){}


  const timeInput = document.querySelector('[name="time"]');
  const timerEl = document.querySelector('.timer');
  const form = document.querySelector('.input-group');
  const ding = document.querySelector('.ding');

  let timeRemaining = Number(timeInput.value);
  setTimeCSS();

  let timer;
  const MINUTE = 1 * 1000 * 60;

  timerEl.addEventListener('click', toggleTimer);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    toggleTimer();
  })

  function toggleTimer(params) {
    timer ? stopTimer() : startTimer();
  }

  function startTimer() {
    document.body.classList.add('timer-running');
    document.body.classList.remove('timer-paused');
    document.body.classList.remove('timer-finished');

    timeRemaining = Number(timeInput.value) + 1;
    tick();
  }

  function tick() {
    timeRemaining--;
    setTimeCSS();

    if (!timeRemaining) {
      stopTimer();
      return;
    }

    timer = window.setTimeout(tick, MINUTE);
  }

  function setTimeCSS() {
    document.documentElement.style.setProperty(
      '--time',
      360 - range(0, 60, 0, 360, Number(timeRemaining))
    );
  }

  function stopTimer() {
    document.body.classList.add('timer-paused');
    document.body.classList.add('timer-finished');
    document.body.classList.remove('timer-running');

    if (ding) {
      ding.play();
    }

    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }

    setTimeout(() => {
      document.body.classList.remove('timer-finished');
    }, 1000);
  }
})();
