type Rebuild<
  NumberList extends number[],
  AvailableToys extends string[] = Toys,
  Acc extends string[] = []
> = NumberList extends [infer CurNumber extends number, ...infer RestNumbers extends number[]]
  ? AvailableToys extends [infer CurToy extends string, ...infer RestToys extends string[]]
    ? AddToList<CurNumber, CurToy> extends infer List extends string[]
      ? Rebuild<RestNumbers, RestToys, [...Acc, ...List]>
      : never
    : Rebuild<[CurNumber, ...RestNumbers], Toys, Acc>
  : Acc;

type AddToList<Repeat extends number, Toy extends string, List extends string[] = [Toy]> = List['length'] extends Repeat
  ? List
  : AddToList<Repeat, Toy, [...List, Toy]>;

type Toys = ['🛹', '🚲', '🛴', '🏄'];
/* _____________ Test Cases _____________ */

import { Expect, Equal } from 'type-testing';

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = ['🛹', '🛹', '🚲', '🛴', '🛴', '🛴', '🏄', '🏄', '🏄', '🛹', '🚲', '🛴', '🛴'];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = ['🛹', '🛹', '🛹', '🚲', '🚲', '🚲', '🛴', '🛴', '🏄', '🛹', '🛹', '🚲', '🛴', '🛴'];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
  '🛹',
  '🛹',
  '🚲',
  '🚲',
  '🚲',
  '🛴',
  '🛴',
  '🛴',
  '🏄',
  '🏄',
  '🏄',
  '🏄',
  '🏄',
  '🛹',
  '🚲',
  '🛴',
  '🛴'
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
