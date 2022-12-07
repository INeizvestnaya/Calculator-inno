import {
  AddCommand,
  DivCommand,
  executor,
  FactCommand,
  MulCommand,
  PercCommand,
  PowCommand,
  RootCommand,
  SubCommand
} from '../command/command';
import { OPERATIONS } from '../constants';

const execute = (leftOperand, operation, rightOperand) => {
  document.querySelector(
    '#calculator-input #prev'
  ).textContent = `${leftOperand}${operation.sign}${rightOperand}`;

  switch (operation.name) {
    case OPERATIONS.ADD:
      executor.execute(new AddCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.SUB:
      executor.execute(new SubCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.MUL:
      executor.execute(new MulCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.DIV:
      executor.execute(new DivCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.POW2:
    case OPERATIONS.POW3:
    case OPERATIONS.POWY:
      executor.execute(new PowCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.ROOT2:
    case OPERATIONS.ROOT3:
    case OPERATIONS.ROOTY:
      executor.execute(new RootCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.POW10:
      executor.execute(new PowCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.DIV1:
      executor.execute(new DivCommand(+leftOperand, +rightOperand));
      break;
    case OPERATIONS.FACT:
      executor.execute(new FactCommand(+leftOperand));
      break;
    case OPERATIONS.PERC:
      executor.execute(
        new PercCommand(+leftOperand, {
          percentAmount: +rightOperand.slice(0, -1),
          percentOperation: operation.percentOperation
        })
      );
      break;
    default:
      break;
  }

  const res = executor.getLastResult();

  return res.toString();
};

export default execute;
