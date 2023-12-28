/** because "dashing" implies speed */
type Dasher = '💨';

/** representing dancing or grace */
type Dancer = '💃';

/** a deer, prancing */
type Prancer = '🦌';

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = '🌟';

/** for the celestial body that shares its name */
type Comet = '☄️';

/** symbolizing love, as Cupid is the god of love */
type Cupid = '❤️';

/** representing thunder, as "Donner" means thunder in German */
type Donner = '🌩️';

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = '⚡';

/** for his famous red nose */
type Rudolph = '🔴';

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type SUDOKU = Reindeer[][][];
type ROW = Reindeer[][];
type PLAINROW = Reindeer[];

type Validate<S extends SUDOKU> = FlatRows<S> extends infer PlainRows extends PLAINROW[]
  ? ProcessRows<PlainRows> extends true
    ? ProcessRows<Transpose<PlainRows>> extends true
      ? ProcessRows<BoxesToRows<S>> extends true
        ? true
        : false
      : false
    : false
  : false;

type FlatRows<S extends SUDOKU, PlainRows extends PLAINROW[] = []> = S extends [
  infer First extends ROW,
  ...infer Rest extends SUDOKU
]
  ? FlatRows<Rest, [...PlainRows, MyFlatArray<First>]>
  : PlainRows;

type ProcessRows<PlainRows extends PLAINROW[]> = PlainRows extends [
  infer FirstRow extends PLAINROW,
  ...infer RestRows extends PLAINROW[]
]
  ? ValidateRow<FirstRow> extends true
    ? ProcessRows<RestRows>
    : false
  : true;

type ValidateRow<Row extends PLAINROW> = ArrayToObject<Row> extends UnionToObject<Reindeer> ? true : false;

type MyFlatArray<T, F extends Array<any> = []> = T extends [
  infer First extends Array<any>,
  ...infer Rest extends Array<any>
]
  ? MyFlatArray<Rest, [...F, ...First]>
  : F;

type ArrayToObject<T extends any[]> = {
  [K in T[number]]: true;
};

type UnionToObject<T extends string> = {
  [key in T]: true;
};

type Transpose<MATRIX extends any[][]> = MATRIX extends Array<infer ROW>
  ? {
      [K in keyof ROW]: {
        [P in keyof MATRIX]: MATRIX[P][K];
      };
    }
  : never;

type BoxesToRows<S extends SUDOKU> = [
  [...S[0][0], ...S[1][0], ...S[2][0]],
  [...S[0][1], ...S[1][1], ...S[2][1]],
  [...S[0][2], ...S[1][2], ...S[2][2]],
  [...S[3][0], ...S[4][0], ...S[5][0]],
  [...S[3][1], ...S[4][1], ...S[5][1]],
  [...S[3][2], ...S[4][2], ...S[5][2]],
  [...S[6][0], ...S[7][0], ...S[8][0]],
  [...S[6][1], ...S[7][1], ...S[8][1]],
  [...S[6][2], ...S[7][2], ...S[8][2]]
];

/* _____________ Test Cases _____________ */

import { Equal, Expect } from 'type-testing';

type test_sudoku_1_actual = Validate<
  [
    //   ^?
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
    [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
    [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['🌩️', '🔴', '⚡']],
    [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
    [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']]
  ]
>;
type test_sudoku_1 = Expect<Equal<test_sudoku_1_actual, true>>;

type test_sudoku_2_actual = Validate<
  [
    //   ^?
    [['🌩️', '💨', '☄️'], ['🌟', '🦌', '⚡'], ['❤️', '🔴', '💃']],
    [['🌟', '⚡', '❤️'], ['🔴', '💃', '☄️'], ['🌩️', '💨', '🦌']],
    [['🔴', '🦌', '💃'], ['💨', '❤️', '🌩️'], ['🌟', '⚡', '☄️']],
    [['❤️', '☄️', '🌩️'], ['💃', '⚡', '🔴'], ['💨', '🦌', '🌟']],
    [['🦌', '💃', '⚡'], ['🌩️', '🌟', '💨'], ['🔴', '☄️', '❤️']],
    [['💨', '🌟', '🔴'], ['🦌', '☄️', '❤️'], ['⚡', '💃', '🌩️']],
    [['☄️', '🔴', '💨'], ['❤️', '🌩️', '🦌'], ['💃', '🌟', '⚡']],
    [['💃', '❤️', '🦌'], ['⚡', '🔴', '🌟'], ['☄️', '🌩️', '💨']],
    [['⚡', '🌩️', '🌟'], ['☄️', '💨', '💃'], ['🦌', '❤️', '🔴']]
  ]
>;
type test_sudoku_2 = Expect<Equal<test_sudoku_2_actual, true>>;

type test_sudoku_3_actual = Validate<
  [
    //   ^?
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🌟', '⚡', '💨'], ['❤️', '💃', '🔴'], ['☄️', '🌩️', '🦌']],
    [['☄️', '🌩️', '❤️'], ['⚡', '🌟', '🦌'], ['💃', '🔴', '💨']],
    [['🌩️', '💃', '🔴'], ['🦌', '💨', '⚡'], ['🌟', '☄️', '❤️']],
    [['❤️', '☄️', '⚡'], ['💃', '🌩️', '🌟'], ['🦌', '💨', '🔴']],
    [['💨', '🌟', '🦌'], ['☄️', '🔴', '❤️'], ['🌩️', '💃', '⚡']],
    [['💃', '💨', '🌟'], ['🔴', '🦌', '☄️'], ['❤️', '⚡', '🌩️']],
    [['🔴', '❤️', '☄️'], ['🌟', '⚡', '🌩️'], ['💨', '🦌', '💃']],
    [['⚡', '🦌', '🌩️'], ['💨', '❤️', '💃'], ['🔴', '🌟', '☄️']]
  ]
>;
type test_sudoku_3 = Expect<Equal<test_sudoku_3_actual, true>>;

type test_sudoku_4_actual = Validate<
  [
    //   ^?
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['🦌', '💨', '💃'], ['⚡', '☄️', '❤️'], ['🔴', '🌩️', '🌟']],
    [['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃'], ['⚡', '☄️', '❤️']],
    [['⚡', '☄️', '❤️'], ['🌩️', '🔴', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🦌', '💨'], ['❤️', '🌟', '☄️'], ['⚡', '🔴', '🌟']],
    [['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨'], ['❤️', '🌟', '☄️']],
    [['❤️', '🌟', '☄️'], ['🔴', '🌩️', '⚡'], ['💃', '🦌', '💨']]
  ]
>;
type test_sudoku_4 = Expect<Equal<test_sudoku_4_actual, false>>;

type test_sudoku_5_actual = Validate<
  [
    //   ^?
    [['🌩️', '💨', '☄️'], ['🌟', '🦌', '⚡'], ['❤️', '🔴', '💃']],
    [['🌟', '⚡', '❤️'], ['🔴', '💃', '☄️'], ['🌩️', '💨', '🦌']],
    [['🔴', '🦌', '💃'], ['💨', '❤️', '🌩️'], ['🌟', '⚡', '☄️']],
    [['❤️', '☄️', '🌩️'], ['💃', '⚡', '🔴'], ['💨', '🦌', '🌟']],
    [['🦌', '💃', '⚡'], ['🌩️', '🌟', '💨'], ['🔴', '☄️', '❤️']],
    [['💨', '🌟', '🔴'], ['🦌', '☄️', '❤️'], ['⚡', '💃', '🌩️']],
    [['☄️', '🔴', '💨'], ['❤️', '💃', '🦌'], ['💃', '🌟', '⚡']],
    [['💃', '❤️', '🦌'], ['⚡', '🔴', '🌟'], ['☄️', '🌩️', '💨']],
    [['⚡', '🌩️', '🌟'], ['☄️', '💨', '💃'], ['🦌', '❤️', '🔴']]
  ]
>;
type test_sudoku_5 = Expect<Equal<test_sudoku_5_actual, false>>;

type test_sudoku_6_actual = Validate<
  [
    //   ^?
    [['⚡', '🔴', '🌩️'], ['🦌', '❤️', '💨'], ['💨', '🌟', '☄️']],
    [['❤️', '🦌', '🌟'], ['💨', '🌟', '🔴'], ['💃', '⚡', '🌩️']],
    [['💨', '💃', '🌟'], ['☄️', '⚡', '🌩️'], ['🔴', '❤️', '🦌']],
    [['🦌', '⚡', '🔴'], ['❤️', '💃', '💨'], ['☄️', '🌩️', '🌟']],
    [['🌟', '🌩️', '💃'], ['⚡', '🔴', '☄️'], ['❤️', '🦌', '💨']],
    [['☄️', '💨', '❤️'], ['🌟', '🌩️', '🦌'], ['⚡', '💃', '🔴']],
    [['🌩️', '☄️', '💨'], ['💃', '🦌', '⚡'], ['🌟', '🔴', '❤️']],
    [['🔴', '❤️', '⚡'], ['🌩️', '☄️', '🌟'], ['🦌', '💨', '💃']],
    [['💃', '🌟', '🦌'], ['🔴', '💨', '❤️'], ['🌩️', '☄️', '⚡']]
  ]
>;
type test_sudoku_6 = Expect<Equal<test_sudoku_6_actual, false>>;

type test_sudoku_7_actual = Validate<
  [
    [['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴']],
    [['💃', '🦌', '☄️'], ['❤️', '🌩️', '🌟'], ['⚡', '🔴', '💨']],
    [['🦌', '☄️', '❤️'], ['🌩️', '🌟', '⚡'], ['🔴', '💨', '💃']],
    [['☄️', '❤️', '🌩️'], ['🌟', '⚡', '🔴'], ['💨', '💃', '🦌']],
    [['❤️', '🌩️', '🌟'], ['⚡', '🔴', '💨'], ['💃', '🦌', '☄️']],
    [['🌩️', '🌟', '⚡'], ['🔴', '💨', '💃'], ['🦌', '☄️', '❤️']],
    [['🌟', '⚡', '🔴'], ['💨', '💃', '🦌'], ['☄️', '❤️', '🌩️']],
    [['⚡', '🔴', '💨'], ['💃', '🦌', '☄️'], ['❤️', '🌩️', '🌟']],
    [['🔴', '💨', '💃'], ['🦌', '☄️', '❤️'], ['🌩️', '🌟', '⚡']]
  ]
>;

type test_sudoku_7 = Expect<Equal<test_sudoku_7_actual, false>>;

type test_sudoku_8_actual = Validate<
  [
    //   ^?
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']],
    [['🦌', '🔴', '💃'], ['🌩️', '☄️', '💨'], ['⚡', '❤️', '🌟']]
  ]
>;

type test_sudoku_8 = Expect<Equal<test_sudoku_8_actual, false>>;
