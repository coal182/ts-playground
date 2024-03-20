import fetch from 'node-fetch';

export async function promiseMethods(): Promise<void> {
  /**
   * PROMISES 1
   */
  async function promises(): Promise<void> {
    console.log('📌 PROMISES');

    const promise = new Promise(function (resolve, reject) {
      // a warning msg will appear because no-floating-promises eslint rule, a catch is needed
      fetch('https://gutendex.com/books/?search=Frankenstein')
        .then((response) => response.json())
        .then((data) => {
          if (data.count === 0) {
            reject();
          }
          resolve(data.results);
        });
    });

    await promise
      .then((result: any) => console.log('Promise resolved! Book found: ' + JSON.stringify(result[0].title)))
      .catch((error) => console.log('Promise rejected!: Book not found ' + error))
      .finally(() => console.log('Finally after then & catch'));
  }

  await promises();

  /**
   * PROMISES CHAINED 2
   */
  async function chainedPromises(): Promise<void> {
    console.log('📌 PROMISES CHAINED 2'); // 1

    const promise2 = new Promise(function (resolve) {
      setTimeout(() => resolve(1), 1000);
    });

    await promise2
      .then(function (result: any): number {
        console.log(result); // 1
        return result * 2;
      })
      .then(function (result) {
        console.log(result); // 1
        return result * 2;
      })
      .then(function (result) {
        console.log(result); // 1
        return result * 2;
      })
      .catch(function (error) {
        console.log(error); // 2
      });
  }

  await chainedPromises();

  async function showPokemon(): Promise<void> {
    console.log('📌 ASYNC / AWAIT: SHOW POKEMON');

    const pokemon: any = await getPokemon(1);

    // espera 3 segundos
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(pokemon.name);
  }
  await showPokemon();

  async function promiseAll(): Promise<void> {
    console.log('📌 PROMISE ALL: Resolve when all resolved');

    await Promise.all<Record<string, any>>([getPokemon(1), getPokemon(4)]).then(([bulbasaur, charmander]) => {
      console.log(
        'Both Results:',
        { name: bulbasaur.name, type: bulbasaur.types[0].type.name },
        { name: charmander.name, type: charmander.types[0].type.name }
      );
    });
  }
  await promiseAll();

  async function promiseAllSettled(): Promise<void> {
    console.log('📌 PROMISE ALL SETTLED: Filter by status');

    await Promise.allSettled<Record<string, any>>([getPokemon(1), getPokemon(4), getNotFoundRequest()]).then(
      (promisesResults) => {
        const [bulbasaur, charmander] = promisesResults;

        if (bulbasaur.status === 'fulfilled') {
          console.log({ name: bulbasaur.value.name, type: bulbasaur.value.types[0].type.name });
        }

        if (charmander.status === 'fulfilled') {
          console.log({ name: charmander.value.name, type: charmander.value.types[0].type.name });
        }

        promisesResults
          .filter((r) => r.status === 'rejected')
          .forEach((r) => {
            console.log('Error resolving third promise', r.status);
          });
      }
    );
  }
  await promiseAllSettled();

  async function promiseAny(): Promise<void> {
    console.log('📌 PROMISE ANY: First fullfilled resolved');

    await Promise.any([getPokemon(1), getPokemon(4), getPokemon(7)]).then((firstResolvedPromise) => {
      console.log({ name: firstResolvedPromise.name, type: firstResolvedPromise.types[0].type.name });
    });
  }
  await promiseAny();

  async function promiseRace(): Promise<void> {
    console.log(
      '📌 PROMISE RACE: First resolved fullfilled or rejected (Useful to cancel the rest of promises if one resolves)'
    );

    await Promise.race([getPokemon(1), timeoutCheck(5000)]).then((firstResolvedPromise) => {
      console.log({ name: firstResolvedPromise.name, type: firstResolvedPromise.types[0].type.name });
    });
  }
  await promiseRace();

  async function getPokemon(id: number) {
    return (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json();
  }

  async function getNotFoundRequest() {
    return (await fetch('https://pokeapi.co/api/v2/404')).json();
  }

  function timeoutCheck(timeout: number) {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error('La solicitud ha tardado demasiado en completarse.'));
      }, timeout);
    });
  }

  function cancellablePromise() {
    console.log('📌 CANCELLABLE PROMISE');
    const controller = new AbortController();

    const query = (search: string) =>
      fetch(`https://gutendex.com/books?search=${search}`, { signal: controller.signal }).then((response) =>
        response.json()
      );

    query('Frankenstein')
      .then((response) => {
        console.log('📌 Response from cancellable promise');
      })
      .catch(() => {
        console.log('❌ fetch cancelled');
      });

    controller.abort();
  }

  cancellablePromise();

  async function typedCatch() {
    console.log('📌 TYPED CATCH');

    try {
      await Promise.reject(new NotFoundError());
    } catch (error) {
      // @ts-expect-error: should show error due to useUnknownInCatchVariables in tsconfig.json, if error is any instead unknown is not safe
      console.log(error.errorMessage());

      if (error instanceof NotFoundError) {
        console.log(error.errorMessage());
      }
    }
  }

  await typedCatch();

  async function unhandledRejection() {
    console.log('📌 UNHANDLED REJECTION');
    // Global rejection catcher
    process.on('unhandledRejection', () => {
      console.error('💥 Unexpected error');
    });
    return Promise.reject();
  }

  await unhandledRejection();
}

export class NotFoundError extends Error {
  errorMessage() {
    return '❌ Not found';
  }
}
