import fetch from "node-fetch";

export function promiseMethods(){

    /**
     * PROMISES 1
     */

    let promise = new Promise(function(resolve, reject) {

        throw new Error('Something went wrong');

        let res = 1;
        resolve(res);
        
        setTimeout(() => resolve(2), 1000);
    });
    
    promise
        .then((result) => {
            console.log("PROMISES"); 
            console.log('Promise resolved! ' + result)
        })
        .catch((error) => console.log('Promise rejected! ' + error));

    /**
     * PROMISES CHAINED 2
     */

    let promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1000);
    });
    
    promise2.then(function(result: any): number {
        console.log("PROMISES CHAINED 2"); // 1
        console.log(result); // 1
        return result * 2;
    })
    .then(function(result) {
        console.log(result); // 1
        return result * 2;
    })
    .then(function(result) {
        console.log(result); // 1
        return result * 2;
    }).catch(function(error) { // 2
        console.log(error);
    });

    async function showPokemon() {

        // leer nuestro JSON
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/30');
        let pokemon: any = await response.json();

        // espera 3 segundos
        await new Promise((resolve, reject) => setTimeout(resolve, 3000));

        console.log("ASYNC / AWAIT: SHOW POKEMON");
        console.log(pokemon.forms);
        console.log(pokemon.sprites.front_default);

    }
      
    showPokemon();

}