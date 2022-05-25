console.log('PIPE');

interface Person {
    name: string;
    age: number;
}

const getName = (person: Person): string => person.name;

const uppercase = (string: string): string => string.toUpperCase();

const get6Characters = (string: string): string => string.substring(0, 6);

const reverse = (string: string): string => string.split('').reverse().join('');

export function pipeExample(): void {
    console.log('Bad Aproach:');

    const result = reverse(get6Characters(uppercase(getName({name: 'Buckethead', age: 42}))));

    console.log(result);

    console.log('Better Aproach:');

    const pipe =
        (...fns: any) =>
        (x: any) =>
            fns.reduce((v: any, f: any) => f(v), x);

    const result2 = pipe(getName, uppercase, get6Characters, reverse)({name: 'Buckethead', age: 42});
    // 'TEKCUB'

    console.log(result2);
}
