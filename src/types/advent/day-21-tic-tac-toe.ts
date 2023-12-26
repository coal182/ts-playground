type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  ';
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [['  ', '  ', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

type TicTacToe<
  Game extends TicTacToeGame,
  Position extends TicTacToePositions
> = Game['state'] extends infer CurrentState extends TicTacToeChip
  ? Position extends `${'top'}-${infer axisX extends TicTacToeXPositions}`
    ? UpdateRow<Game['board'][0], axisX, CurrentState> extends infer UpdatedRow extends TicTacToeCell[]
      ? CheckGameEndStatus<{
          board: [UpdatedRow, Game['board'][1], Game['board'][2]];
          state: ShiftState<CurrentState>;
        }>
      : Game
    : Position extends `${'middle'}-${infer axisX extends TicTacToeXPositions}`
    ? UpdateRow<Game['board'][1], axisX, CurrentState> extends infer UpdatedRow extends TicTacToeCell[]
      ? CheckGameEndStatus<{
          board: [Game['board'][0], UpdatedRow, Game['board'][2]];
          state: ShiftState<CurrentState>;
        }>
      : Game
    : Position extends `${'bottom'}-${infer axisX extends TicTacToeXPositions}`
    ? UpdateRow<Game['board'][2], axisX, CurrentState> extends infer UpdatedRow extends TicTacToeCell[]
      ? CheckGameEndStatus<{
          board: [Game['board'][0], Game['board'][1], UpdatedRow];
          state: ShiftState<CurrentState>;
        }>
      : Game
    : Game
  : never;

type FullBoard = [TicTacToeChip[], TicTacToeChip[], TicTacToeChip[]];

type UpdateRow<
  Row extends TicTacToeCell[],
  XPosition extends TicTacToeXPositions,
  Chip extends TicTacToeChip
> = Row extends [
  infer LeftCell extends TicTacToeCell,
  infer CenterCell extends TicTacToeCell,
  infer RightCell extends TicTacToeCell
]
  ? [
      XPosition extends 'left' ? (LeftCell extends TicTacToeEmptyCell ? Chip : 0) : LeftCell,
      XPosition extends 'center' ? (CenterCell extends TicTacToeEmptyCell ? Chip : 0) : CenterCell,
      XPosition extends 'right' ? (RightCell extends TicTacToeEmptyCell ? Chip : 0) : RightCell
    ]
  : never;

type ShiftState<S> = S extends '❌' ? '⭕' : '❌';

type CheckGameEndStatus<Game extends TicTacToeGame> = CheckRowsStatus<Game['board'], '❌'> extends 1
  ? { board: Game['board']; state: '❌ Won' }
  : CheckRowsStatus<Game['board'], '⭕'> extends 1
  ? { board: Game['board']; state: '⭕ Won' }
  : CheckColumnsStatus<Game['board'], '❌'> extends 1
  ? { board: Game['board']; state: '❌ Won' }
  : CheckColumnsStatus<Game['board'], '⭕'> extends 1
  ? { board: Game['board']; state: '⭕ Won' }
  : Game['board'] extends FullBoard
  ? { board: Game['board']; state: 'Draw' }
  : Game;

type CheckRowsStatus<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = Board extends [
  infer FirstRow,
  ...infer RestRows extends TicTacToeCell[][]
]
  ? FirstRow extends [Chip, Chip, Chip]
    ? 1
    : CheckRowsStatus<RestRows, Chip>
  : 0;

type CheckColumnsStatus<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = Board extends [
  [Chip, ...infer Rest],
  [Chip, ...infer Rest],
  [Chip, ...infer Rest]
]
  ? 1
  : Board extends [[infer First, Chip, infer Last], [infer First, Chip, infer Last], [infer First, Chip, infer Last]]
  ? 1
  : Board extends [[...infer First, Chip], [...infer First, Chip], [...infer First, Chip]]
  ? 1
  : 0;

/* _____________ Test Cases _____________ */

import { Equal, Expect } from 'type-testing';

type test_move1_actual = TicTacToe<NewGame, 'top-center'>;
//   ^?
type test_move1_expected = {
  board: [['  ', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
//   ^?
type test_move2_expected = {
  board: [['⭕', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '❌';
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
//   ^?
type test_move3_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
//   ^?
type test_move4_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '  ', '  ']];
  state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
//   ^?
type test_x_win_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '❌', '  ']];
  state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
//   ^?
type type_move5_expected = {
  board: [['⭕', '❌', '  '], ['  ', '❌', '  '], ['⭕', '  ', '❌']];
  state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, 'middle-left'>;
//   ^?
type test_o_win_expected = {
  board: [['⭕', '❌', '  '], ['⭕', '❌', '  '], ['⭕', '  ', '❌']];
  state: '⭕ Won';
};

type test_o_win = Expect<Equal<test_o_win_actual, test_o_win_expected>>;

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
//   ^?
type test_invalid_expected = {
  board: [['  ', '❌', '  '], ['  ', '  ', '  '], ['  ', '  ', '  ']];
  state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [['⭕', '❌', '⭕'], ['⭕', '❌', '❌'], ['❌', '⭕', '  ']];
  state: '⭕';
};
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
//   ^?
type test_draw_expected = {
  board: [['⭕', '❌', '⭕'], ['⭕', '❌', '❌'], ['❌', '⭕', '⭕']];
  state: 'Draw';
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
