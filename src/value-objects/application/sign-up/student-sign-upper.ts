import {Student} from '../../domain/student';
import {StudentId} from '../../domain/student-id';
import {StudentName} from '../../domain/student-name';
import {StudentPassword} from '../../domain/student-password';

export class StudentSignUpper {
    public students: Student[] = [];

    public constructor(id: StudentId, name: StudentName, password: StudentPassword) {
        const student = new Student(id, name, password);
        this.students.push(student);
    }
}
