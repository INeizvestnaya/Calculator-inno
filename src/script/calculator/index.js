import calculator from './calculator';
import memory from './memory';

const calc = () => {
  const calculatorButtons = document
    .querySelector('.calculator')
    .querySelectorAll('button');

  const buttonClickHandler = (event) => {
    const sign = event.target.textContent;
    calculator.typeSign(sign);

    const { leftOperand, rightOperand, operation } =
      calculator.getCalculatorData();

    document.querySelector(
      '#calculator-input #cur'
    ).textContent = `${leftOperand}${operation.sign}${rightOperand}`;

    document.querySelector('#memory').textContent = memory.read() ? 'M' : '';
  };

  for (const b of calculatorButtons) {
    b.addEventListener('click', buttonClickHandler);
  }
};

export default calc;
