const STORAGE_ITEM = 'calc-theme';
const DARK = 'dark';
const LIGHT = 'light';

const changeTheme = () => {
  const themeButton = document.querySelector('#change-theme');
  const buttons = document.querySelectorAll('button');
  const orangeButtons = document.querySelectorAll('#orange');
  const numberButtons = document.querySelectorAll('#number-button');
  const calculatorInput = document.querySelector('#calculator-input');
  const memory = document.querySelector('#memory');

  const applyTheme = (type) => {
    localStorage.setItem(STORAGE_ITEM, type === DARK ? DARK : LIGHT);

    themeButton.textContent = type === DARK ? LIGHT : DARK;

    for (const b of buttons) {
      b.classList.add(type === DARK ? 'dark-button' : 'light-button');
      b.classList.remove(type === DARK ? 'light-button' : 'dark-button');
    }
    for (const b of orangeButtons) {
      b.classList.add(
        type === DARK ? 'orange-button-dark' : 'orange-button-light'
      );
      b.classList.remove(
        type === DARK ? 'orange-button-light' : 'orange-button-dark'
      );
    }
    for (const b of numberButtons) {
      b.classList.add(
        type === DARK ? 'number-button-dark' : 'number-button-light'
      );
      b.classList.remove(
        type === DARK ? 'number-button-light' : 'number-button-dark'
      );
    }

    themeButton.classList.add(type === DARK ? DARK : LIGHT);
    themeButton.classList.remove(type === DARK ? LIGHT : DARK);

    document.body.style.backgroundColor = type === DARK ? '#48494a' : 'white';
    calculatorInput.style.color = type === DARK ? 'white' : 'black';
    memory.style.color = type === DARK ? 'white' : 'black';
  };

  let theme = localStorage.getItem(STORAGE_ITEM);
  if (!theme) {
    localStorage.setItem(STORAGE_ITEM, DARK);
    theme = DARK;
  } else if (theme === DARK) {
    applyTheme(DARK);
  } else {
    applyTheme(LIGHT);
  }

  themeButton.addEventListener('click', () => {
    if (localStorage.getItem(STORAGE_ITEM) === DARK) {
      applyTheme(LIGHT);
    } else {
      applyTheme(DARK);
    }
  });
};

export default changeTheme;
