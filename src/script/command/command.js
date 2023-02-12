import { ERROR, SIGNS } from '../constants';
import { add, div, fact, mul, perc, pow, root, sub } from './operations';
import careTaker from './snapshot';

class Command {
  constructor(execute, leftOperand, rightOperand, sign) {
    this.execute = execute;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
    this.sign = sign;
  }
}

export function AddCommand(left, right) {
  return new Command(add, left, right, SIGNS.ADD);
}

export function SubCommand(left, right) {
  return new Command(sub, left, right, SIGNS.SUB);
}

export function MulCommand(left, right) {
  return new Command(mul, left, right, SIGNS.MUL);
}

export function DivCommand(left, right) {
  return new Command(div, left, right, SIGNS.DIV);
}

export function PowCommand(left, right) {
  return new Command(pow, left, right, SIGNS.POW);
}

export function RootCommand(left, right) {
  return new Command(root, left, right, SIGNS.ROOT);
}

export function FactCommand(left) {
  return new Command(fact, left, '', SIGNS.FACT);
}

export function PercCommand(left, operation) {
  return new Command(perc, left, operation, SIGNS.PERC);
}

class Executor {
  constructor() {
    this.lastResult = null;
  }

  execute(command) {
    this.lastResult = command.execute(
      command.leftOperand,
      command.rightOperand
    );

    if (Number.isFinite(this.lastResult) && !Number.isNaN(this.lastResult)) {
      this.lastResult = +this.lastResult.toFixed(3);
    } else {
      this.lastResult = ERROR;
    }

    careTaker.addSnapshot(
      command.leftOperand,
      command.sign,
      command.rightOperand,
      this.lastResult
    );
  }

  getLastResult() {
    return this.lastResult;
  }
}

export const executor = new Executor();

export default Executor;
