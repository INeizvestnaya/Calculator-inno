class Memory {
  constructor() {
    this.memory = 0;
  }

  clear() {
    this.memory = 0;
  }

  add(value) {
    this.memory += value;
  }

  sub(value) {
    this.memory -= value;
  }

  read() {
    return this.memory;
  }
}

const memory = new Memory();

export default memory;
