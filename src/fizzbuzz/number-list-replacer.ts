import {RuleInterface, FizzRule, BuzzRule, FizzBuzzRule, EvenNumberRule} from './rules';

export class NumberListReplacer
{
  rules: RuleInterface[] = [];

  addRule(rule: RuleInterface) {
    this.rules.push(rule);
  }

  generate(number: number) {
    let output: string[] = [];

    for (let i = 1; i <= number; i++) {
      output.push(this.getReplacement(i));
    }
    return output;
  }

  getReplacement(number: number): string {
    for (let rule of this.rules) {
      if (rule.matches(number)) {
        return rule.getReplacement();
      }
    }
    return String(number);
  }
}


