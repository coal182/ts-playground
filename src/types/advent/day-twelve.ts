// eslint-disable-line
type FindSanta<FOREST extends Array<'🎅🏼'|'🎄'>> = FOREST extends [...infer Rest extends Array<'🎅🏼'|'🎄'>, infer Last] // eslint-disable-line
  ? Last extends '🎅🏼'
    ? Rest['length']
    : FindSanta<Rest>
  : never;

/* _____________ Test Cases _____________ */

import { Expect, Equal } from 'type-testing';

type Forest0 = ['🎅🏼', '🎄', '🎄', '🎄'];
type test_0_actual = FindSanta<Forest0>;
//   ^?
type test_0_expected = 0;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type Forest1 = ['🎄', '🎅🏼', '🎄', '🎄', '🎄', '🎄'];
type test_1_actual = FindSanta<Forest1>;
//   ^?
type test_1_expected = 1;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type Forest2 = ['🎄', '🎄', '🎅🏼', '🎄'];
type test_2_actual = FindSanta<Forest2>;
//   ^?
type test_2_expected = 2;
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

type Forest3 = ['🎄', '🎄', '🎄', '🎅🏼', '🎄'];
type test_3_actual = FindSanta<Forest3>;
//   ^?
type test_3_expected = 3;
type test_3 = Expect<Equal<test_3_expected, test_3_actual>>;

type Forest4 = ['🎄', '🎄', '🎄', '🎄', '🎅🏼'];
type test_4_actual = FindSanta<Forest4>;
//   ^?
type test_4_expected = 4;
type test_4 = Expect<Equal<test_4_expected, test_4_actual>>;

type Forest5 = ['🎄', '🎄', '🎄', '🎄'];
type test_5_actual = FindSanta<Forest5>;
//   ^?
type test_5_expected = never;
type test_5 = Expect<Equal<test_5_expected, test_5_actual>>;
