import { expect } from 'chai';
import { stub } from 'sinon';

import {FizzRule, BuzzRule, FizzBuzzRule, EvenNumberRule} from './rules';
import {NumberListReplacer} from './number-list-replacer';

const fizzBuzz = new NumberListReplacer();

beforeEach(() => {
    fizzBuzz.addRule(new FizzBuzzRule());
    fizzBuzz.addRule(new FizzRule());
    fizzBuzz.addRule(new BuzzRule());
});

describe(NumberListReplacer.name, () => {

    describe('when asked to get replacement to a number', () => {
        
        describe('and number is multiple of 3', () => {

            let numbers = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60];
        
            it('should return fizz', async () => {
                
                /*
                if (number%3 === 0 && number%5 === 0) return "FizzBuzz";
                if (number%3) return "Fizz";
                if (number%5) return "Buzz";
                */

                const expectedValue = fizzBuzz.getReplacement(numbers[5]);
                const expectedResponse = 'Fizz';

                expect(expectedValue).to.deep.equal(expectedResponse);

            });

        });

        describe('and number is multiple of 5', () => {

            let numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
        
            it('should return buzz', async () => {
                
                const expectedValue = fizzBuzz.getReplacement(numbers[2]);
                const expectedResponse = 'Buzz';

                expect(expectedValue).to.deep.equal(expectedResponse);

            });

        });

        describe('and number is multiple of 3 and 5', () => {

            let numbers = [15, 30, 45, 60, 75];
        
            it('should return fizzbuzz', async () => {
                
                const expectedValue = fizzBuzz.getReplacement(numbers[4]);
                const expectedResponse = 'FizzBuzz';

                expect(expectedValue).to.deep.equal(expectedResponse);

            });

        });
    

    
    });
});