import {promiseMethods} from './promises'
import {arrayMethods} from './arrays'
import {giveMeTheFirstValueAvailable} from './clean-code'
import {spread} from './spread'
import {pipeExample} from './pipe'
import {executeFizzBuzz} from './fizzbuzz/'

//arrayMethods();
//promiseMethods();
//giveMeTheFirstValueAvailable();
//spread();
executeFizzBuzz(100);

let screens = 'asd3d21'
screens.split(',').map((id) => ({id}));
console.log(screens);

pipeExample();