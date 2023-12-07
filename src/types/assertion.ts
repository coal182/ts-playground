type Cost = {
  cost: number;
};

export class Assertion {
  public constructor() {
    const data: Record<string, unknown> = { cost: 2000 };
    this.assertCostInData(data);
    this.getCost(data.cost);
  }

  private assertCostInData(data: Record<string, unknown>): asserts data is Cost {
    if (data.cost !== undefined) {
      if (typeof data.cost !== 'number') {
        throw new Error(`Cost ${data.cost} is not a number`);
      }
    } else {
      throw new Error('Cost is undefined in reportData');
    }
  }

  private getCost(cost: number): void {
    console.log('Cost: ', cost);
  }
}
