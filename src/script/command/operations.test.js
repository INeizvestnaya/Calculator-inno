import { ERROR, OPERATIONS } from '../constants';
import Executor, {
  AddCommand,
  DivCommand,
  FactCommand,
  MulCommand,
  PercCommand,
  PowCommand,
  RootCommand,
  SubCommand
} from './command';

describe('Operations', () => {
  let executor;

  beforeEach(() => {
    executor = new Executor();
  });

  it('Add', () => {
    executor.execute(new AddCommand(3, 9));
    expect(executor.getLastResult()).toBe(12);

    executor.execute(new AddCommand(12, 452.96847));
    expect(executor.getLastResult()).toBe(464.968);
  });

  it('Sub', () => {
    executor.execute(new SubCommand(55.3, 36.2843));
    expect(executor.getLastResult()).toBe(19.016);

    executor.execute(new SubCommand(19.016, 92));
    expect(executor.getLastResult()).toBe(-72.984);
  });

  it('Mul', () => {
    executor.execute(new MulCommand(0, 5));
    expect(executor.getLastResult()).toBe(0);

    executor.execute(new MulCommand(5.5, 4.32));
    expect(executor.getLastResult()).toBe(23.76);
  });

  it('Div', () => {
    executor.execute(new DivCommand(0, 5));
    expect(executor.getLastResult()).toBe(0);

    executor.execute(new DivCommand(0, 0));
    expect(executor.getLastResult()).toBe(ERROR);

    executor.execute(new DivCommand(5, 0));
    expect(executor.getLastResult()).toBe(ERROR);

    executor.execute(new DivCommand(26.4, 4.32));
    expect(executor.getLastResult()).toBe(6.111);

    executor.execute(new DivCommand(6.111, 35.9));
    expect(executor.getLastResult()).toBe(0.17);
  });

  it('Pow 2', () => {
    executor.execute(new PowCommand(-7.5, 2));
    expect(executor.getLastResult()).toBe(56.25);
  });

  it('Pow 3', () => {
    executor.execute(new PowCommand(3.35, 3));
    expect(executor.getLastResult()).toBe(37.595);
  });

  it('Pow y', () => {
    executor.execute(new PowCommand(56.25, 0.3));
    expect(executor.getLastResult()).toBe(3.35);

    executor.execute(new PowCommand(3.35, 0));
    expect(executor.getLastResult()).toBe(1);

    executor.execute(new PowCommand(1, 100));
    expect(executor.getLastResult()).toBe(1);
  });

  it('10 pow y', () => {
    executor.execute(new PowCommand(10, 3.5));
    expect(executor.getLastResult()).toBe(3162.278);

    executor.execute(new PowCommand(10, 0.3));
    expect(executor.getLastResult()).toBe(1.995);
  });

  it('Root 2', () => {
    executor.execute(new RootCommand(-3, 2));
    expect(executor.getLastResult()).toBe(ERROR);

    executor.execute(new RootCommand(87, 2));
    expect(executor.getLastResult()).toBe(9.327);
  });

  it('Root 3', () => {
    executor.execute(new RootCommand(-27, 3));
    expect(executor.getLastResult()).toBe(-3);
  });

  it('Root y', () => {
    executor.execute(new RootCommand(4, 0));
    expect(executor.getLastResult()).toBe(1);

    executor.execute(new RootCommand(43925.697, 6));
    expect(executor.getLastResult()).toBe(5.94);
  });

  it('1/x', () => {
    executor.execute(new DivCommand(1, 34));
    expect(executor.getLastResult()).toBe(0.029);

    executor.execute(new DivCommand(10, 0));
    expect(executor.getLastResult()).toBe(ERROR);
  });

  it('Factorial', () => {
    executor.execute(new FactCommand(5));
    expect(executor.getLastResult()).toBe(120);

    executor.execute(new FactCommand(3.4));
    expect(executor.getLastResult()).toBe(10.549);

    executor.execute(new FactCommand(0));
    expect(executor.getLastResult()).toBe(1);

    executor.execute(new FactCommand(-1));
    expect(executor.getLastResult()).toBe(ERROR);
  });

  it('Percent', () => {
    executor.execute(
      new PercCommand(150, {
        percentAmount: 10,
        percentOperation: { name: OPERATIONS.ADD }
      })
    );
    expect(executor.getLastResult()).toBe(165);

    executor.execute(
      new PercCommand(150, {
        percentAmount: 20,
        percentOperation: { name: OPERATIONS.SUB }
      })
    );
    expect(executor.getLastResult()).toBe(120);

    executor.execute(
      new PercCommand(150, {
        percentAmount: 25,
        percentOperation: { name: OPERATIONS.MUL }
      })
    );
    expect(executor.getLastResult()).toBe(5625);

    executor.execute(
      new PercCommand(150, {
        percentAmount: 25,
        percentOperation: { name: OPERATIONS.DIV }
      })
    );
    expect(executor.getLastResult()).toBe(4);
  });
});
