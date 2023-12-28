type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | '  ';
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';

type EmptyBoard = [
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ']
];

type FullBoard = [Connect4Chips[], Connect4Chips[], Connect4Chips[], Connect4Chips[], Connect4Chips[], Connect4Chips[]];

type NewGame = {
  board: EmptyBoard;
  state: '🟡';
};

type Connect4Board = Connect4Cell[][];

type Connect4Game = {
  board: Connect4Board;
  state: Connect4State;
};

type Connect4<
  G extends Connect4Game,
  Column extends number
> = G['state'] extends infer CurrentState extends Connect4State
  ? CheckGameEndStatus<{
      board: UpdateBoard<G['board'], Column, CurrentState>;
      state: ShiftState<CurrentState>;
    }>
  : never;

type UpdateBoard<
  Board extends Connect4Board,
  Column extends number,
  CurrentState extends Connect4State,
  ProcessedRows extends Connect4Board = []
> = Board extends [...infer Head extends Connect4Board, infer Last extends Connect4Cell[]]
  ? Last[Column] extends Connect4Chips
    ? UpdateBoard<Head, Column, CurrentState, [Last, ...ProcessedRows]>
    : [...Head, UpdateRow<Last, Column, CurrentState>, ...ProcessedRows]
  : ProcessedRows;

type UpdateRow<
  Row extends Connect4Cell[],
  Column extends number,
  CurrentState extends Connect4State
> = Row extends Connect4Cell[]
  ? {
      [K in keyof Row]: K extends `${Column}` ? CurrentState : Row[K];
    }
  : never;

type ShiftState<S extends Connect4State> = S extends '🟡' ? '🔴' : '🟡';

type CheckGameEndStatus<Game extends Connect4Game> = CheckRowsStatus<Game['board'], '🟡'> extends 1
  ? { board: Game['board']; state: '🟡 Won' }
  : CheckRowsStatus<Game['board'], '🔴'> extends 1
  ? { board: Game['board']; state: '🔴 Won' }
  : CheckRowsStatus<Transpose<Game['board']>, '🟡'> extends 1
  ? { board: Game['board']; state: '🟡 Won' }
  : CheckRowsStatus<Transpose<Game['board']>, '🔴'> extends 1
  ? { board: Game['board']; state: '🔴 Won' }
  : CheckRowsStatus<DiagonalTranspose<Game['board']>, '🟡'> extends 1
  ? { board: Game['board']; state: '🟡 Won' }
  : CheckRowsStatus<DiagonalTranspose<Game['board']>, '🔴'> extends 1
  ? { board: Game['board']; state: '🔴 Won' }
  : Game['board'] extends FullBoard
  ? { board: Game['board']; state: 'Draw' }
  : Game;

type CheckRowsStatus<Board extends Connect4Board, Chip extends Connect4Chips> = Board extends [
  infer FirstRow extends string[],
  ...infer RestRows extends Connect4Board
]
  ? WinCondition<FirstRow, Chip> extends 1
    ? 1
    : CheckRowsStatus<RestRows, Chip>
  : 0;

type WinCondition<T extends string[], Chip extends Connect4Chips, S extends string = ''> = T extends [
  infer First extends string,
  ...infer Tail extends string[]
]
  ? WinCondition<Tail, Chip, `${S}${First}`>
  : S extends `${infer Prefix}${Chip}${Chip}${Chip}${Chip}${infer Suffix}`
  ? 1
  : 0;

type Transpose<MATRIX extends any[][]> = MATRIX extends Array<infer ROW>
  ? {
      [K in keyof ROW]: {
        [P in keyof MATRIX]: MATRIX[P][K];
      };
    }
  : never;

type DiagonalTranspose<MATRIX extends any[][]> = [
  [MATRIX[3][0], MATRIX[2][1], MATRIX[1][2], MATRIX[0][3]],
  [MATRIX[4][0], MATRIX[3][1], MATRIX[2][2], MATRIX[1][3], MATRIX[0][4]],
  [MATRIX[5][0], MATRIX[4][1], MATRIX[3][2], MATRIX[2][3], MATRIX[1][4], MATRIX[0][5]],
  [MATRIX[5][1], MATRIX[4][2], MATRIX[3][3], MATRIX[2][4], MATRIX[1][5], MATRIX[0][6]],
  [MATRIX[5][2], MATRIX[4][3], MATRIX[3][4], MATRIX[2][5], MATRIX[1][6]],
  [MATRIX[5][3], MATRIX[4][4], MATRIX[3][5], MATRIX[2][6]]
];

/* _____________ Test Cases _____________ */

import { Expect, Equal } from 'type-testing';

type test_move1_actual = Connect4<NewGame, 0>;

//   ^?
type test_move1_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  ']
  ];
  state: '🔴';
};

type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  ']
  ];
  state: '🟡';
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  ']
  ];
  state: '🔴';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '  ', '  ', '  ', '  ', '  ']
  ];
  state: '🟡';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '  ', '  ', '  ', '  ']
  ];
  state: '🔴';
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '🔴', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '  ', '  ', '  ', '  ']
  ];
  state: '🟡';
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🔴', '🔴', '🔴', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
    ];
    state: '🔴';
  },
  3
>;

type test_red_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🔴', '🔴', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
  ];
  state: '🔴 Won';
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '  ', '  ', '  ', '  ', '  '],
      ['🟡', '🔴', '  ', '  ', '  ', '  ', '  ']
    ];
    state: '🟡';
  },
  0
>;

type test_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '  ', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '  ', '  ', '  ', '  ', '  '],
    ['🟡', '🔴', '  ', '  ', '  ', '  ', '  ']
  ];
  state: '🟡 Won';
};

type test_yellow_win = Expect<Equal<test_yellow_win_actual, test_yellow_win_expected>>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
      ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
      ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
      ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
    ];
    state: '🟡';
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '🟡', '  ', '  ', '  '],
    ['  ', '  ', '🟡', '🔴', '  ', '  ', '  '],
    ['🔴', '🟡', '🔴', '🔴', '  ', '  ', '  '],
    ['🟡', '🔴', '🟡', '🟡', '  ', '  ', '  ']
  ];
  state: '🟡 Won';
};

type test_diagonal_yellow_win = Expect<Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>>;

type test_draw_actual = Connect4<
  {
    board: [
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '  '],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
      ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
      ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴']
    ];
    state: '🟡';
  },
  6
>;

type test_draw_expected = {
  board: [
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴'],
    ['🟡', '🔴', '🔴', '🟡', '🟡', '🔴', '🟡'],
    ['🔴', '🟡', '🟡', '🔴', '🔴', '🟡', '🔴']
  ];
  state: 'Draw';
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
