interface Counter {
  increment: (incrementBy: number) => void;
  decrement: (decrementBy: number) => void;
  getCount: () => number
}

export class DialCounter implements Counter {
  public constructor(
    protected count: number,
    protected readonly maxCount: number
  ) {}

  public increment(incrementBy: number) {
    this.count = (this.count + incrementBy) % this.maxCount;
  }

  public decrement(decrementBy: number) {
    const tmp = (this.count - decrementBy) % this.maxCount;
    const overflow = tmp < 0 ? this.maxCount : 0;
    this.count = tmp + overflow;
  }

  public getCount(): number {
    return this.count;
  }
}