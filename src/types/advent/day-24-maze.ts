type Alley = '  ';
type MazeItem = '🎄' | '🎅' | Alley;
type DELICIOUS_COOKIES = '🍪';
type MazeMatrix = MazeItem[][];
type Directions = 'up' | 'down' | 'left' | 'right';
type VerticalDirections = 'up' | 'down';

type Move<M extends MazeMatrix, D extends Directions> = D extends VerticalDirections
  ? Transpose<UpdateMaze<Transpose<M>, D>>
  : UpdateMaze<M, D>;

type UpdateMaze<M extends MazeMatrix, D extends Directions, NewMatrix extends MazeMatrix = []> = M extends [
  infer CurrentRow extends MazeItem[],
  ...infer Tail extends MazeMatrix
]
  ? FindSanta<CurrentRow> extends infer SantaPosition extends number
    ? D extends 'up' | 'left'
      ? SantaPosition extends 0
        ? D extends 'left'
          ? MazeWin
          : [...NewMatrix, MoveBackwards<CurrentRow>, ...Tail]
        : [...NewMatrix, MoveBackwards<CurrentRow>, ...Tail]
      : D extends 'down' | 'right'
      ? [...NewMatrix, MoveAhead<CurrentRow>, ...Tail]
      : never
    : UpdateMaze<Tail, D, [...NewMatrix, CurrentRow]>
  : NewMatrix;

type MoveAhead<Row extends MazeItem[], NewRow extends MazeItem[] = []> = Row extends [
  infer FirstItem,
  ...infer RestItems extends MazeItem[]
]
  ? FirstItem extends '🎄'
    ? MoveAhead<RestItems, [...NewRow, FirstItem]>
    : FirstItem extends '🎅'
    ? MoveAhead<RestItems, [...NewRow, FirstItem]>
    : FirstItem extends '  '
    ? LastOfArray<NewRow> extends '🎅'
      ? [...Pop<NewRow>, '  ', '🎅', ...RestItems]
      : MoveAhead<RestItems, [...NewRow, FirstItem]>
    : NewRow
  : NewRow;

type MoveBackwards<Row extends MazeItem[], ProcessedItems extends MazeItem[] = []> = Row extends [
  ...infer Head extends MazeItem[],
  infer Last
]
  ? Last extends '🎄'
    ? MoveBackwards<Head, [Last, ...ProcessedItems]>
    : Last extends '🎅'
    ? MoveBackwards<Head, [Last, ...ProcessedItems]>
    : Last extends '  '
    ? FirstOfArray<ProcessedItems> extends '🎅'
      ? [...Head, '🎅', '  ', ...Shift<ProcessedItems>]
      : MoveBackwards<Head, [Last, ...ProcessedItems]>
    : ProcessedItems
  : ProcessedItems;

type FirstOfArray<A extends any[]> = A extends [infer First, ...infer Tail] ? First : A[0];
type LastOfArray<A extends any[]> = A extends [...infer Head, infer Last] ? Last : A[0];
type Pop<A extends any[]> = A extends [...infer Head, infer Last] ? Head : A;
type Shift<T extends Array<any>> = T extends [infer _, ...infer Rest] ? Rest : T;

type FindSanta<ROW> = ROW extends [...infer Head, infer Last]
  ? Last extends '🎅'
    ? Head['length']
    : FindSanta<Head>
  : false;

type Transpose<MATRIX extends any[][]> = MATRIX extends Array<infer ROW>
  ? {
      [K in keyof ROW]: {
        [P in keyof MATRIX]: MATRIX[P][K];
      };
    }
  : never;

/* _____________ Test Cases _____________ */

import { Expect, Equal } from 'type-testing';

type Maze0 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎅', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];

// can't move up!
type test_maze0_up_actual = Move<Maze0, 'up'>;
//   ^?
type test_maze0_up = Expect<Equal<test_maze0_up_actual, Maze0>>;

// but Santa can move down!
type test_maze0_down_actual = Move<Maze0, 'down'>;
//   ^?
type Maze1 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎅', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze0_down = Expect<Equal<test_maze0_down_actual, Maze1>>;

// Santa can move down again!
type test_maze1_down_actual = Move<Maze1, 'down'>;
type Maze2 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎅', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze1_down = Expect<Equal<test_maze1_down_actual, Maze2>>;

// can't move left!
type test_maze2_left_actual = Move<Maze2, 'left'>;
//   ^?
type test_maze2_left = Expect<Equal<test_maze2_left_actual, Maze2>>;

// if Santa moves up, it's back to Maze1!
type test_maze2_up_actual = Move<Maze2, 'up'>;
//   ^?
type test_maze2_up = Expect<Equal<test_maze2_up_actual, Maze1>>;

// can't move right!
type test_maze2_right_actual = Move<Maze2, 'right'>;
//   ^?
type test_maze2_right = Expect<Equal<test_maze2_right_actual, Maze2>>;

// we exhausted all other options! guess we gotta go down!
type test_maze2_down_actual = Move<Maze2, 'down'>;
//   ^?
type Maze3 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '🎅', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze2_down = Expect<Equal<test_maze2_down_actual, Maze3>>;

// maybe we just gotta go down all the time?
type test_maze3_down_actual = Move<Maze3, 'down'>;
//   ^?
type Maze4 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '🎅', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze3_down = Expect<Equal<test_maze3_down_actual, Maze4>>;

// let's go left this time just to change it up?
type test_maze4_left_actual = Move<Maze4, 'left'>;
//   ^?
type Maze5 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '🎅', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
// it worked!
type test_maze4_left = Expect<Equal<test_maze4_left_actual, Maze5>>;

// couldn't hurt to try left again?
type test_maze5_left_actual = Move<Maze5, 'left'>;
//   ^?
type Maze6 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '🎅', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze5_left = Expect<Equal<test_maze5_left_actual, Maze6>>;

// three time's a charm?
type test_maze6_left_actual = Move<Maze6, 'left'>;
//   ^?
// lol, nope.
type test_maze6_left = Expect<Equal<test_maze6_left_actual, Maze6>>;

// we haven't tried up yet (?)
type test_maze6_up_actual = Move<Maze6, 'up'>;
//   ^?
type Maze7 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '🎅', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
// NOICE.
type test_maze6_up = Expect<Equal<test_maze6_up_actual, Maze7>>;

// maybe another left??
type test_maze7_left_actual = Move<Maze7, 'left'>;
//   ^?
type Maze8 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '🎅', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze7_left = Expect<Equal<test_maze7_left_actual, Maze8>>;

// haven't tried a right yet.. let's give it a go!
type test_maze7_right_actual = Move<Maze8, 'right'>;
//   ^?
// not this time...
type test_maze7_right = Expect<Equal<test_maze7_right_actual, Maze7>>;

// probably just need to stick with left then
type test_maze8_left_actual = Move<Maze8, 'left'>;
//   ^?
type Maze9 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '🎅', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze8_left = Expect<Equal<test_maze8_left_actual, Maze9>>;

// why fix what's not broken?
type test_maze9_left_actual = Move<Maze9, 'left'>;
//   ^?
type Maze10 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '🎅', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze9_left = Expect<Equal<test_maze9_left_actual, Maze10>>;

// do you smell cookies?? it's coming from down..
type test_maze10_down_actual = Move<Maze10, 'down'>;
//   ^?
type Maze11 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['  ', '🎅', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze10_down = Expect<Equal<test_maze10_down_actual, Maze11>>;

// the cookies must be freshly baked.  I hope there's also the customary glass of milk!
type test_maze11_left_actual = Move<Maze11, 'left'>;
//   ^?
type Maze12 = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎅', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze12_left_actual_res = [
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '  ', '  ', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '  ', '🎄'],
  ['🎅', '  ', '🎄', '🎄', '  ', '  ', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '🎄', '🎄', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '  ', '  ', '  ', '  ', '🎄', '  ', '🎄', '🎄', '🎄'],
  ['🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄', '🎄']
];
type test_maze11_left = Expect<Equal<test_maze11_left_actual, Maze12>>;

// COOKIES!!!!!
type test_maze12_left_actual = Move<Maze12, 'left'>;
//   ^?
type MazeWin = [
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪'],
  ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪', '🍪']
];
type test_maze12_left = Expect<Equal<test_maze12_left_actual, MazeWin>>;
