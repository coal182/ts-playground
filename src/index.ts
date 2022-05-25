import {promiseMethods} from './promises';
import {arrayMethods} from './arrays';
import {giveMeTheFirstValueAvailable} from './clean-code';
import {spread} from './spread';
import {pipeExample} from './pipe';
import {executeFizzBuzz} from './fizzbuzz/';
import {subject} from './rxjs/subject';
import {getPokemonsIds} from '../test/stub';

//arrayMethods();
//promiseMethods();
//giveMeTheFirstValueAvailable();
//spread();
//executeFizzBuzz(100);
//pipeExample();
subject();

const pokemons = getPokemonsIds(9)
    .then((pokemons) => {
        console.log(pokemons);
    })
    .catch((err) => {
        console.log(err);
    });
