export interface RuleInterface {
    matches(number: number): boolean;
    getReplacement(): string;
}

export class FizzRule implements RuleInterface {
    matches(number: number): boolean {
      return number % 3 === 0;
    }
  
    getReplacement(): string {
      return "Fizz";
    }
  }
  
export class BuzzRule implements RuleInterface {
    matches(number: number): boolean {
      return number % 5 === 0;
    }
  
    getReplacement(): string {
      return "Buzz";
    }
  }
  
export class FizzBuzzRule implements RuleInterface {
    matches(number: number): boolean {
      return number % 3 === 0 && number % 5 === 0;
    }
  
    getReplacement(): string {
      return "FizzBuzz";
    }
}

export class EvenNumberRule implements RuleInterface {
    matches(number: number): boolean {
      return number % 3 === 0 && number % 5 === 0;
    }
  
    getReplacement(): string {
      return "FizzBuzz";
    }
}
  
  