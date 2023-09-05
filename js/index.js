const yearInput = document.querySelector('#year');
const monthInput = document.querySelector('#month');
const dayInput = document.querySelector('#day');

dayInput.focus();

const yearLabel = yearInput.previousElementSibling;
const monthLabel = monthInput.previousElementSibling;
const dayLabel = dayInput.previousElementSibling;

const yearMessage = yearInput.nextElementSibling;
const monthMessage = monthInput.nextElementSibling;
const dayMessage = dayInput.nextElementSibling;

const form = document.querySelector('.calculator__form');

const resultYears = document.querySelector('#result-years');
const resultMonths = document.querySelector('#result-months');
const resultDays = document.querySelector('#result-days');

const state = {
  invalid: false,
  errors: {
    day: '',
    month: '',
    year: '',
  },
};

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const render = (day, month, year) => {
  if (state.invalid) {
    if (!yearInput.classList.contains('calculator__input-invalid')) {
      yearInput.classList.add('calculator__input-invalid');
      yearLabel.classList.add('calculator__label-invalid');
      monthInput.classList.add('calculator__input-invalid');
      monthLabel.classList.add('calculator__label-invalid');
      dayInput.classList.add('calculator__input-invalid');
      dayLabel.classList.add('calculator__label-invalid');

    }
  } else {
    yearInput.classList.remove('calculator__input-invalid');
    yearLabel.classList.remove('calculator__label-invalid');
    monthInput.classList.remove('calculator__input-invalid');
    monthLabel.classList.remove('calculator__label-invalid');
    dayInput.classList.remove('calculator__input-invalid');
    dayLabel.classList.remove('calculator__label-invalid');

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    let deltaYears = todayYear - year;
    let deltaMonths = todayMonth - month;
    let deltaDays = todayDate - day;
    if (deltaDays < 0) {
      deltaMonths -= 1;
      const daysInThisMonth = (year % 4 === 0 && month === 2) ? 29 : daysInMonths[month - 1];
      deltaDays = daysInThisMonth - day + todayDate;
    }
    if (deltaMonths < 0) {
      deltaYears -= 1;
      deltaMonths += 12;
    }

    resultYears.textContent = deltaYears;
    resultMonths.textContent = deltaMonths;
    resultDays.textContent = deltaDays;
  }

  yearMessage.textContent = state.errors.year;
  monthMessage.textContent = state.errors.month;
  dayMessage.textContent = state.errors.day;
};

const validateInput = (name, value) => {
  if (!value) {
    state.errors[name] = 'This field is required';
  }
};

const validateDate = (day, month, year) => {
  if (day > 31 || day < 1) {
    state.errors.day = 'Must be a valid day';
  }

  if (month > 12 || month < 1) {
    state.errors.month = 'Must be a valid month';
  }

  const date = new Date(year, month - 1, day);

  if (date.getDate() !== day) {
    state.errors.day = 'Must be a valid date';
  }

  if (date > new Date()) {
    state.errors.year = 'Must be in the past';
  }
}

const isInvalid = () => {
  const { errors: { day, month, year } } = state;
  state.invalid = (!!day || !!month || !!year);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  state.errors = {
    day: '',
    month: '',
    year: '',
  };

  const formData = new FormData(e.target);
  const entries = [...formData.entries()];

  const year = Number(formData.get('year'));
  const month = Number(formData.get('month'));
  const day = Number(formData.get('day'));

  validateDate(day, month, year);
  validateInput('year', year);
  validateInput('month', month);
  validateInput('day', day);
  isInvalid();

  render(day, month, year);
});
