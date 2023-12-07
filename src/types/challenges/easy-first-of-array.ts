/* eslint-disable @typescript-eslint/ban-ts-comment */

//https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md

type First<T extends Array<unknown>> = T extends [] ? never : T[0];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
];
