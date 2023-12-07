// https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md

type MyReturnType<T> = T extends (..._: any[]) => infer ReturnType ? ReturnType : never;

const getReturnTypeFn = (v: boolean): 1 | 2 => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof getReturnTypeFn>; // should be "1 | 2"

/* _____________ Test Cases _____________ */

import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, 'foo'];
  bar: 'hello';
  prev(): number;
};

const fn = (v: boolean): 1 | 2 => (v ? 1 : 2);
const fn1 = (v: boolean, w: any): 1 | 2 => (v ? 1 : 2);
