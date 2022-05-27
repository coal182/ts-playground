import {StringValueObject} from '../shared/string-value-object';
import {InvalidArgumentError} from '../shared/invalid-argument-error';

export class StudentName extends StringValueObject {
    public constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan30Characters(value);
    }

    private ensureLengthIsLessThan30Characters(value: string): void {
        if (value.length > 30) {
            throw new InvalidArgumentError(`The Course Name <${value}> has more than 30 characters`);
        }
    }
}
