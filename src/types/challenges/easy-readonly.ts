// https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md

type MyReadonlyString<T> = {
  [key in keyof T]: string;
};
// Type mapping + Indexed Access Types
type MyReadonlyGeneric<T> = {
  readonly [key in keyof T]: T[key];
};

// Remove readonly of all properties with Mapping modifiers: (readonly), optional (?), add modifiers (+) , remove modifiers(-)
type MyReadonlyGenericRemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key];
};

const todo: MyReadonlyGeneric<TodoReadonly> = {
  title: 'Hey',
  description: 'foobar',
  completed: true,
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<MyReadonlyGeneric<TodoReadonly>, Readonly<TodoReadonly>>>];

interface TodoReadonly {
  readonly title: string;
  description: string;
  completed: boolean;
}
