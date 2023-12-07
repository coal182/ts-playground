import { InvalidArgumentError } from '../shared/invalid-argument-error';
import { StringValueObject } from '../shared/string-value-object';

export class StudentPassword extends StringValueObject {
  public constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Course Password <${value}> has more than 30 characters`);
    }
  }
}
