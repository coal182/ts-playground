// https://github.com/type-challenges/type-challenges/tree/main/questions/00016-medium-pop

type Pop<T extends Array<unknown>> = T extends [...infer Head, unknown] ? Head : [];

type result = Pop<[3, 2, 1]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>
];
