class Snapshot {
  constructor(leftOperand, sign, rightOperand, result) {
    this.leftOperand = leftOperand;
    this.sign = sign;
    this.rightOperand = rightOperand;
    this.result = result;
  }
}

class CareTaker {
  constructor() {
    this.snapshots = [];
  }

  addSnapshot(left, sign, right, res) {
    this.snapshots.push(new Snapshot(left, sign, right, res));
  }

  undo() {
    this.snapshots.pop();
    return this.snapshots[this.snapshots.length - 1];
  }
}

const careTaker = new CareTaker();

export default careTaker;
