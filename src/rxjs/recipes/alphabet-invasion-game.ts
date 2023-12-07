import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  interval,
  map,
  debounceTime,
  takeWhile,
  switchMap,
  endWith,
} from 'rxjs';

// https://www.learnrxjs.io/learn-rxjs/recipes/alphabet-invasion-game

export function alphabetInvasionGame() {
  const template = `<div id="alphabet-invasion-game">
        <div>
          Score: <span id="alphabet-invasion-game-score">0</span>
          Level: <span id="alphabet-invasion-game-level">1</span>
        </div>
        <br />
        <div id="alphabet-invasion-game-waterfall" style="width: 300px; height: 290px"></div>
        <br />
        <div>-----------------------------------------------</div>
        <br />
        <div id="alphabet-invasion-game-over" style="display: none">
          GAME OVER!
        </div>
      </div>`;
  document.body.innerHTML = template;

  const idRoot = 'alphabet-invasion-game';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const endThreshold = 15;
  const levelChangeThreshold = 10;
  const scoreSubject$ = new BehaviorSubject(0);
  const levelSubject$ = new BehaviorSubject(1);
  const intervalSubject = new BehaviorSubject(500);
  let displayedLetters: string[][] = [];

  const waterfall = document.getElementById(`${idRoot}-waterfall`);

  combineLatest([scoreSubject$, levelSubject$]).subscribe(([score, level]) => {
    const scoreEl = document.getElementById(`${idRoot}-score`);
    const levelEl = document.getElementById(`${idRoot}-level`);
    if (scoreEl) scoreEl.innerHTML = score.toString();
    if (levelEl) levelEl.innerHTML = level.toString();
  });

  intervalSubject
    .pipe(
      switchMap((speed) =>
        interval(speed).pipe(
          map(() => alphabet[randomIntFromInterval(0, alphabet.length - 1)]),
          takeWhile(() => displayedLetters.length <= endThreshold),
          endWith(null)
        )
      ),
      takeWhile((x) => x != null)
    )
    .subscribe({
      next: (letter) => {
        addLetter(letter);
        renderWaterfall();
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: gameOver,
    });

  fromEvent<KeyboardEvent>(document, 'keyup').pipe(debounceTime(100)).subscribe(handleKeyPressed);

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function addLetter(letter: string | null) {
    if (letter) {
      displayedLetters.push([letter, '&nbsp;'.repeat(randomIntFromInterval(0, 60))]);
    }
  }

  function renderWaterfall() {
    if (waterfall) {
      waterfall.innerHTML = '';
      displayedLetters.forEach(([letter, padding]) => {
        const element = document.createElement('div');
        element.innerHTML = padding + letter;
        waterfall.prepend(element);
      });
    }
  }

  function handleKeyPressed(e: KeyboardEvent) {
    displayedLetters = displayedLetters.filter((letter) => {
      if (letter[0] == e.key) {
        updateScore();
      }
      return letter[0] != e.key;
    });
    renderWaterfall();
  }

  function updateScore() {
    const currentScore = scoreSubject$.value;
    if (currentScore == levelChangeThreshold) {
      increaseLevel();
    }
    scoreSubject$.next(scoreSubject$.value + 1);
  }

  function increaseLevel() {
    scoreSubject$.next(0);
    levelSubject$.next(levelSubject$.value + 1);
    intervalSubject.next(intervalSubject.value * 0.8);
  }

  function gameOver() {
    const gameOver = document.getElementById(`${idRoot}-over`) ?? null;
    if (gameOver) gameOver.style.display = 'block';
  }
}

alphabetInvasionGame();
