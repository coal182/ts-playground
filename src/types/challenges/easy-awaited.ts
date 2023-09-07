//https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R> ? (R extends PromiseLike<any> ? MyAwaited<R> : R) : never;

type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string

/* _____________ Test Cases _____________ */

import type {Equal, Expect} from '@type-challenges/utils';

type X = Promise<string>;
type Y = Promise<{field: number}>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = {then: (onfulfilled: (arg: number) => any) => any};

type cases = [
    Expect<Equal<MyAwaited<X>, string>>,
    Expect<Equal<MyAwaited<Y>, {field: number}>>,
    Expect<Equal<MyAwaited<Z>, string | number>>,
    Expect<Equal<MyAwaited<Z1>, string | boolean>>,
    Expect<Equal<MyAwaited<T>, number>>
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type error = MyAwaited<number>;
