/* eslint-disable @typescript-eslint/ban-ts-comment */
// https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md

type Length<T extends Array<unknown>> = T['length'];

type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'];

/* _____________ Test Cases _____________ */
import type {Equal, Expect} from '@type-challenges/utils';

type cases = [
    Expect<Equal<Length<tesla>, 4>>,
    Expect<Equal<Length<spaceX>, 5>>,
    // @ts-expect-error
    Length<5>,
    // @ts-expect-error
    Length<'hello world'>
];
