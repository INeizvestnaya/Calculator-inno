import careTaker from '../command/snapshot';
import { ERROR, OPERATION_TYPES, OPERATIONS } from '../constants';
import execute from './executeOperation';
import getOperation from './getOperation';
import memory from './memory';

const EMPTY_OPERATION = { name: '', type: '', sign: '' };

const updateOperand = (operand, sign) => {
  if (operand === ERROR) {
    operand = '';
    document.querySelector('#calculator-input #prev').textContent = '';
  }

  if (operand === '0' && !Number.isNaN(+sign)) {
    return sign;
  }

  if (sign === '0' && operand === '0') {
    return operand;
  }

  if (sign === '.' && operand.includes('.')) {
    return operand;
  }

  if (sign === '.' && operand === '') {
    return `0.`;
  }

  return `${operand}${sign}`;
};

const changeOperandSign = (operand) =>
  operand[0] === '-' ? operand.slice(1) : `-${operand}`;

const getConstOperand = (operation) => {
  switch (operation.name) {
    case OPERATIONS.POW2:
    case OPERATIONS.ROOT2:
      return '2';
    case OPERATIONS.POW3:
    case OPERATIONS.ROOT3:
      return '3';
    case OPERATIONS.POW10:
      return '10';
    case OPERATIONS.DIV1:
      return '1';
    default:
      return '';
  }
};

const isSimpleMath = (operation) =>
  [OPERATIONS.ADD, OPERATIONS.SUB, OPERATIONS.MUL, OPERATIONS.DIV].includes(
    operation.name
  );

class Calculator {
  constructor() {
    this.leftOperand = '';
    this.rightOperand = '';
    this.operation = EMPTY_OPERATION;
    this.overwrite = false;
  }

  updateCalculatorData(left, operation, right) {
    this.leftOperand = left;
    this.operation = operation;
    this.rightOperand = right;
  }

  onlyLeftOperand() {
    return this.leftOperand && !this.operation.name && !this.rightOperand;
  }

  getCalculatorData() {
    return {
      leftOperand: this.leftOperand,
      operation: this.operation,
      rightOperand: this.rightOperand
    };
  }

  typeSign(sign) {
    const typedOperation = getOperation(sign);

    if (!Number.isNaN(+sign) || sign === '.') {
      this.typeNumber(sign);
    } else if (typedOperation) {
      this.typeOperation(typedOperation);
    } else if (sign === '+/-') {
      this.changeSign();
    } else if (sign === 'CE') {
      this.CE();
    } else if (sign === 'C') {
      this.C();
    } else if (sign === '=') {
      this.typeExecute();
    } else if (sign === 'm+') {
      this.memoryPlus();
    } else if (sign === 'm-') {
      this.memoryMinus();
    } else if (sign === 'mr') {
      this.memoryRead();
    } else if (sign === 'mc') {
      this.memoryClear();
    } else if (sign === 'undo') {
      this.undo();
    }
  }

  typeNumber(number) {
    if (this.overwrite) {
      this.leftOperand = '';
      this.overwrite = false;
    }

    if (this.operation.name) {
      this.rightOperand = updateOperand(this.rightOperand, number);
    } else {
      this.leftOperand = updateOperand(this.leftOperand, number);
    }
  }

  typeOperation(typedOperation) {
    if (this.overwrite) {
      this.overwrite = false;
    }

    if (this.leftOperand === ERROR) {
      return;
    }

    if (typedOperation.type === OPERATION_TYPES.BINARY) {
      this.binaryOperation(typedOperation);
    } else if (typedOperation.type === OPERATION_TYPES.RIGHT_CONST) {
      this.operationWithRightConst(typedOperation);
    } else if (typedOperation.type === OPERATION_TYPES.PERC) {
      this.percentOperation(typedOperation);
    } else {
      this.operationWithLeftConst(typedOperation);
    }
  }

  binaryOperation(typedOperation) {
    if (
      this.leftOperand &&
      (this.rightOperand || this.operation.type === OPERATION_TYPES.FACT)
    ) {
      const res = execute(this.leftOperand, this.operation, this.rightOperand);
      const newOperation = res === ERROR ? EMPTY_OPERATION : typedOperation;
      this.updateCalculatorData(res, newOperation, '');
    } else if (this.leftOperand && !this.rightOperand) {
      this.operation = typedOperation;
    }
  }

  operationWithLeftConst(typedOperation) {
    const newRightOperand = getConstOperand(typedOperation);
    if (this.leftOperand && !this.rightOperand) {
      this.updateCalculatorData(
        this.leftOperand,
        typedOperation,
        newRightOperand
      );
    } else if (this.leftOperand && this.operation && this.rightOperand) {
      const res = execute(this.leftOperand, this.operation, this.rightOperand);
      this.updateCalculatorData(res, typedOperation, newRightOperand);
    }
  }

  operationWithRightConst(typedOperation) {
    const left = getConstOperand(typedOperation);
    if (this.leftOperand && !this.rightOperand) {
      this.updateCalculatorData(left, typedOperation, this.leftOperand);
    } else if (this.leftOperand && this.operation && this.rightOperand) {
      const res = execute(this.leftOperand, this.operation, this.rightOperand);
      this.updateCalculatorData(left, typedOperation, res);
    }
  }

  percentOperation(typedOperation) {
    if (this.leftOperand && isSimpleMath(this.operation)) {
      if (!this.rightOperand) {
        this.rightOperand = this.leftOperand;
      }
      this.rightOperand += typedOperation.sign;

      const percentOperation = this.operation;
      this.operation = typedOperation;
      this.operation.percentOperation = percentOperation;
      this.operation.sign = percentOperation.sign;
    }
  }

  changeSign() {
    if (this.leftOperand === ERROR) {
      return;
    }

    if (this.operation.name === OPERATIONS.ADD) {
      this.operation = {
        name: OPERATIONS.SUB,
        sign: '-',
        type: OPERATION_TYPES.BINARY
      };
    } else if (this.operation.name === OPERATIONS.SUB) {
      this.operation = {
        name: OPERATIONS.ADD,
        sign: '+',
        type: OPERATION_TYPES.BINARY
      };
    } else if (this.operation.name && this.rightOperand) {
      this.rightOperand = changeOperandSign(this.rightOperand);
    } else if (this.leftOperand && !this.operation.name) {
      this.leftOperand = changeOperandSign(this.leftOperand);
    }
  }

  CE() {
    if (this.rightOperand) {
      if (this.operation.type === OPERATION_TYPES.PERC) {
        this.operation = this.operation.percentOperation;
      }

      this.rightOperand = this.rightOperand.slice(0, -1);
    } else if (this.operation.name) {
      this.operation = EMPTY_OPERATION;
    } else if (this.leftOperand) {
      this.leftOperand = this.leftOperand.slice(0, -1);
    }
  }

  C() {
    this.updateCalculatorData('', EMPTY_OPERATION, '');
    this.overwrite = false;
  }

  typeExecute() {
    if (this.rightOperand || this.operation.type === OPERATION_TYPES.FACT) {
      const res = execute(this.leftOperand, this.operation, this.rightOperand);
      this.updateCalculatorData(res, EMPTY_OPERATION, '');
      this.overwrite = true;
    }
  }

  memoryPlus() {
    if (this.onlyLeftOperand()) {
      memory.add(+this.leftOperand);
    }
  }

  memoryMinus() {
    if (this.onlyLeftOperand()) {
      memory.sub(+this.leftOperand);
    }
  }

  memoryRead() {
    const memoryValue = memory.read();
    if (memoryValue && this.leftOperand && this.operation.name) {
      this.rightOperand = memoryValue;
    } else if (memoryValue) {
      if (this.leftOperand === ERROR) {
        document.querySelector('#calculator-input #prev').textContent = '';
      }
      this.leftOperand = memoryValue;
    }
  }

  memoryClear() {
    memory.clear();
  }

  undo() {
    const prevExp = careTaker.undo();
    const prevLabel = document.querySelector('#calculator-input #prev');

    if (prevExp) {
      const {
        leftOperand: prevLeft,
        sign: prevSign,
        rightOperand: prevRight,
        result
      } = prevExp;

      this.updateCalculatorData(result, EMPTY_OPERATION, '');

      if (typeof prevRight === 'object') {
        prevLabel.textContent = `
          ${prevLeft}${prevRight.percentOperation.sign}${prevRight.percentAmount}${prevSign}`;
      } else {
        prevLabel.textContent = `${prevLeft}${prevSign}${prevRight}`;
      }
    }
  }
}

const calculator = new Calculator();

export default calculator;
