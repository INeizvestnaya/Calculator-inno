import { OPERATIONS } from '../constants';

const EXP = 2.71828;

const ln = (x) => {
  let res = 0;

  for (let i = 0.01; i < x; i += 0.01) {
    const check = +(EXP ** i).toFixed(3);
    if (x - check <= 0.01) {
      res = i;
      break;
    }
  }

  return res;
};

export const add = (x, y) => x + y;

export const sub = (x, y) => x - y;

export const mul = (x, y) => x * y;

export const div = (x, y) => x / y;

export const pow = (x, y) => x ** y;

export const root = (x, y) => {
  if (y === 0) {
    return 1;
  }

  if (x < 0 && y % 2 === 1) {
    const inverted = -x;
    return -(inverted ** (1 / y));
  }

  return x ** (1 / y);
};

export const fact = (x) => {
  if (x < 0) {
    return NaN;
  }

  if (x === 0) {
    return 1;
  }

  if (x !== +x.toFixed()) {
    const integer = +x.toFixed(0);
    const remainder = x - integer;

    return EXP ** (ln(fact(integer)) + remainder * ln(integer + 1));
  }

  return x * fact(x - 1);
};

export const perc = (left, { percentAmount, percentOperation }) => {
  const percent = (left * percentAmount) / 100;
  switch (percentOperation.name) {
    case OPERATIONS.ADD:
      return add(left, percent);
    case OPERATIONS.SUB:
      return sub(left, percent);
    case OPERATIONS.MUL:
      return mul(left, percent);
    case OPERATIONS.DIV:
      return div(left, percent);
    default:
      return left;
  }
};
