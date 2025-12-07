interface Counter {
  increment: (incrementBy: number) => number;
  decrement: (decrementBy: number) => number;
  getCount: () => number
}

export class DialCounter implements Counter {
  public constructor(
    protected count: number,
    protected readonly maxCount: number
  ) {}

  public increment(incrementBy: number) {
    const zeros = (this.count + incrementBy) / this.maxCount;
    this.count = (this.count + incrementBy) % this.maxCount;
    return Math.floor(zeros);
  }

  public decrement(decrementBy: number) {
    var zeros = 0 === this.count ? -1 : 0;
    zeros = zeros + Math.floor(decrementBy / this.maxCount)
    this.count = this.count - (decrementBy % this.maxCount);
    if (this.count < 0) {
      this.count = this.count + this.maxCount;
      zeros = zeros + 1
    }
    return zeros + Number(0 === this.count)
  }

  public getCount(): number {
    return this.count;
  }
}