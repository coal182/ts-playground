type Letters = {
  A: ['█▀█ ', '█▀█ ', '▀ ▀ '];
  B: ['█▀▄ ', '█▀▄ ', '▀▀  '];
  C: ['█▀▀ ', '█ ░░', '▀▀▀ '];
  E: ['█▀▀ ', '█▀▀ ', '▀▀▀ '];
  H: ['█ █ ', '█▀█ ', '▀ ▀ '];
  I: ['█ ', '█ ', '▀ '];
  M: ['█▄░▄█ ', '█ ▀ █ ', '▀ ░░▀ '];
  N: ['█▄░█ ', '█ ▀█ ', '▀ ░▀ '];
  P: ['█▀█ ', '█▀▀ ', '▀ ░░'];
  R: ['█▀█ ', '██▀ ', '▀ ▀ '];
  S: ['█▀▀ ', '▀▀█ ', '▀▀▀ '];
  T: ['▀█▀ ', '░█ ░', '░▀ ░'];
  Y: ['█ █ ', '▀█▀ ', '░▀ ░'];
  W: ['█ ░░█ ', '█▄▀▄█ ', '▀ ░ ▀ '];
  ' ': ['░', '░', '░'];
  ':': ['#', '░', '#'];
  '*': ['░', '#', '░'];
};

type ToAsciiArt<T extends string, Acc extends string[][] = []> = T extends ''
  ? MyFlatArray<Acc>
  : T extends `${infer FirstLine}\n${infer NextLine}`
  ? ToAsciiArt<NextLine, [...Acc, BuildLine<FirstLine>]>
  : ToAsciiArt<'', [...Acc, BuildLine<T>]>;

type BuildLine<
  Line,
  Acc extends string[] = ['', '', '']
> = Line extends `${infer Char extends string}${infer Rest extends string}`
  ? Capitalize<Char> extends infer CapitalizedChar extends keyof Letters
    ? BuildLine<
        Rest,
        [
          `${Acc[0]}${Letters[CapitalizedChar][0]}`,
          `${Acc[1]}${Letters[CapitalizedChar][1]}`,
          `${Acc[2]}${Letters[CapitalizedChar][2]}`
        ]
      >
    : never
  : Acc;

type MyFlatArray<T, F extends Array<any> = []> = T extends [
  infer First extends Array<any>,
  ...infer Rest extends Array<any>
]
  ? MyFlatArray<Rest, [...F, ...First]>
  : F;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from 'type-testing';

type test_0_actual = ToAsciiArt<'   * : * Merry * : *   \n  Christmas  '>;

//   ^?
type test_0_expected = [
  '░░░░░#░░░█▄░▄█ █▀▀ █▀█ █▀█ █ █ ░░░#░░░░░',
  '░░░#░░░#░█ ▀ █ █▀▀ ██▀ ██▀ ▀█▀ ░#░░░#░░░',
  '░░░░░#░░░▀ ░░▀ ▀▀▀ ▀ ▀ ▀ ▀ ░▀ ░░░░#░░░░░',
  '░░█▀▀ █ █ █▀█ █ █▀▀ ▀█▀ █▄░▄█ █▀█ █▀▀ ░░',
  '░░█ ░░█▀█ ██▀ █ ▀▀█ ░█ ░█ ▀ █ █▀█ ▀▀█ ░░',
  '░░▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀ ░▀ ░▀ ░░▀ ▀ ▀ ▀▀▀ ░░'
];
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;

type test_1_actual = ToAsciiArt<'  Happy new  \n  * : * : * Year * : * : *  '>;
//   ^?
type test_1_expected = [
  '░░█ █ █▀█ █▀█ █▀█ █ █ ░█▄░█ █▀▀ █ ░░█ ░░',
  '░░█▀█ █▀█ █▀▀ █▀▀ ▀█▀ ░█ ▀█ █▀▀ █▄▀▄█ ░░',
  '░░▀ ▀ ▀ ▀ ▀ ░░▀ ░░░▀ ░░▀ ░▀ ▀▀▀ ▀ ░ ▀ ░░',
  '░░░░#░░░#░░░█ █ █▀▀ █▀█ █▀█ ░░░#░░░#░░░░',
  '░░#░░░#░░░#░▀█▀ █▀▀ █▀█ ██▀ ░#░░░#░░░#░░',
  '░░░░#░░░#░░░░▀ ░▀▀▀ ▀ ▀ ▀ ▀ ░░░#░░░#░░░░'
];
type test_1 = Expect<Equal<test_1_actual, test_1_expected>>;

type test_2_actual = ToAsciiArt<'  * : * : * : * : * : * \n  Trash  \n  * : * : * : * : * : * '>;
//   ^?
type test_2_expected = [
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░▀█▀ █▀█ █▀█ █▀▀ █ █ ░░',
  '░░░█ ░██▀ █▀█ ▀▀█ █▀█ ░░',
  '░░░▀ ░▀ ▀ ▀ ▀ ▀▀▀ ▀ ▀ ░░',
  '░░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░'
];
type test_2 = Expect<Equal<test_2_actual, test_2_expected>>;

type test_3_actual = ToAsciiArt<'  : * : * : * : * : * : * : \n  Ecyrbe  \n  : * : * : * : * : * : * : '>;
//   ^?
type test_3_expected = [
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░█▀▀ █▀▀ █ █ █▀█ █▀▄ █▀▀ ░░',
  '░░█▀▀ █ ░░▀█▀ ██▀ █▀▄ █▀▀ ░░',
  '░░▀▀▀ ▀▀▀ ░▀ ░▀ ▀ ▀▀  ▀▀▀ ░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░',
  '░░░░#░░░#░░░#░░░#░░░#░░░#░░░',
  '░░#░░░#░░░#░░░#░░░#░░░#░░░#░'
];
type test_3 = Expect<Equal<test_3_actual, test_3_expected>>;
