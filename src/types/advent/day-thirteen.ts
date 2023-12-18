type DayCounter<
  Start extends number,
  End extends number,
  Counter extends { cur: number; acc: Array<number> } = { cur: Start; acc: [] }
> = Counter['cur'] extends End
  ? Counter['acc'][0] extends Start
    ? ArrayToUnion<Counter['acc']>
    : DayCounter<Start, End, { cur: Counter['cur']; acc: Shift<Counter['acc']> }>
  : DayCounter<Start, End, { cur: Counter['acc']['length']; acc: [...Counter['acc'], Counter['acc']['length']] }>;

type ArrayToUnion<T extends number[]> = T extends [infer U, ...infer Rest extends number[]]
  ? U | ArrayToUnion<Rest>
  : never;

type Shift<T extends Array<any>> = T extends [infer _, ...infer Rest] ? Rest : T;

/* _____________ Test Cases _____________ */

import { Expect, Equal } from 'type-testing';

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type TwelveDaysOfChristmasFrom2 = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_2_actual = DayCounter<2, 12>;
//   ^?
type test_2_expected = TwelveDaysOfChristmasFrom2;
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
