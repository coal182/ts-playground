export function giveMeTheFirstValueAvailable(){

    const valorA = null;
    const valorB = null;
    const valorC = 'valorC';

    const valor = valorA ?? valorB ?? valorC;

    console.log(valor);

}