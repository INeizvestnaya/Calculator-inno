import { OPERATION_TYPES, OPERATIONS, SIGNS } from '../constants';

const getOperation = (sign) => {
  if (sign === '+') {
    return {
      name: OPERATIONS.ADD,
      sign: SIGNS.ADD,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign === '-') {
    return {
      name: OPERATIONS.SUB,
      sign: SIGNS.SUB,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign.codePointAt(0) === 10799) {
    return {
      name: OPERATIONS.MUL,
      sign: SIGNS.MUL,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign.codePointAt(0) === 247) {
    return {
      name: OPERATIONS.DIV,
      sign: SIGNS.DIV,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign === 'x2') {
    return {
      name: OPERATIONS.POW2,
      sign: SIGNS.POW,
      type: OPERATION_TYPES.LEFT_CONST
    };
  }

  if (sign === 'x3') {
    return {
      name: OPERATIONS.POW3,
      sign: SIGNS.POW,
      type: OPERATION_TYPES.LEFT_CONST
    };
  }

  if (sign === 'xy') {
    return {
      name: OPERATIONS.POWY,
      sign: SIGNS.POW,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign.codePointAt(1) === 8730 && sign[0] === '2') {
    return {
      name: OPERATIONS.ROOT2,
      sign: SIGNS.ROOT,
      type: OPERATION_TYPES.LEFT_CONST
    };
  }

  if (sign.codePointAt(1) === 8730 && sign[0] === '3') {
    return {
      name: OPERATIONS.ROOT3,
      sign: SIGNS.ROOT,
      type: OPERATION_TYPES.LEFT_CONST
    };
  }

  if (sign.codePointAt(1) === 8730 && sign[0] === 'y') {
    return {
      name: OPERATIONS.ROOTY,
      sign: SIGNS.ROOT,
      type: OPERATION_TYPES.BINARY
    };
  }

  if (sign === '10x') {
    return {
      name: OPERATIONS.POW10,
      sign: SIGNS.POW,
      type: OPERATION_TYPES.RIGHT_CONST
    };
  }

  if (sign === '1/x') {
    return {
      name: OPERATIONS.DIV1,
      sign: SIGNS.DIV,
      type: OPERATION_TYPES.RIGHT_CONST
    };
  }

  if (sign === 'x!') {
    return {
      name: OPERATIONS.FACT,
      sign: SIGNS.FACT,
      type: OPERATION_TYPES.FACT
    };
  }

  if (sign === '%') {
    return {
      name: OPERATIONS.PERC,
      sign: SIGNS.PERC,
      type: OPERATION_TYPES.PERC
    };
  }

  return null;
};

export default getOperation;
