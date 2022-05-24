import {FizzRule, BuzzRule, FizzBuzzRule, EvenNumberRule} from './rules';
import {NumberListReplacer} from './number-list-replacer';

export function executeFizzBuzz(number: number) {

    const fizBuzz = new NumberListReplacer();
    
    fizBuzz.addRule(new FizzBuzzRule());
    fizBuzz.addRule(new FizzRule());
    fizBuzz.addRule(new BuzzRule());
    
    const result = fizBuzz.generate(number);
    console.log(result);
  
  
    // ex. replace all even numbers with a 'text'
    const evenNumberReplacer = new NumberListReplacer();
    evenNumberReplacer.addRule(new EvenNumberRule());
    const resultEvent = evenNumberReplacer.generate(number);
    //console.log(resultEvent.join(", "));
  
  }