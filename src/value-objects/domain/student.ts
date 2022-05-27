import {StudentId} from './student-id';
import {StudentName} from './student-name';
import {StudentPassword} from './student-password';

export class Student {
    public id: StudentId;
    public name: StudentName;
    public password: StudentPassword;

    public constructor(id: StudentId, name: StudentName, password: StudentPassword) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public static fromPrimitives(plainData: {id: string; name: string; password: string}): Student {
        return new Student(new StudentId(plainData.id), new StudentName(plainData.name), new StudentPassword(plainData.password));
    }

    public toPrimitives(): object {
        return {
            id: this.id.value,
            name: this.name.value,
            password: this.password.value,
        };
    }
}
