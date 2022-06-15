import {promiseMethods} from './promises';
import {arrayMethods} from './arrays';
import {objectMethods} from './objects';
import {lodashMethods} from './lodash';
import {giveMeTheFirstValueAvailable} from './clean-code';
import {spread} from './spread';
import {pipeExample} from './pipe';
import {executeFizzBuzz} from './fizzbuzz/';
import {subject} from './rxjs/subject';
import {getPokemonsIds} from '../test/stub';
import {StudentSignUpper} from './value-objects/application/sign-up/student-sign-upper';
import {StudentPassword} from './value-objects/domain/student-password';
import {StudentName} from './value-objects/domain/student-name';
import {StudentId} from './value-objects/domain/student-id';
import {v4 as uuid} from 'uuid';

//arrayMethods();
//objectMethods();
lodashMethods();
//promiseMethods();
//giveMeTheFirstValueAvailable();
//spread();
//executeFizzBuzz(100);
//pipeExample();
//subject();
/*
const pokemons = getPokemonsIds(9)
    .then((pokemons) => {
        console.log(pokemons);
    })
    .catch((err) => {
        console.log(err);
    });
*/

/*
const id: string = uuid();
const students = new StudentSignUpper(new StudentId(id), new StudentName('Cristian'), new StudentPassword('123456'));

students.students.forEach((student) => {
    console.log(student.toPrimitives());
});
*/
