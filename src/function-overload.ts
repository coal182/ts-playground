function addSomething(a: number, b: number): number;
function addSomething(a: string, b: string): string;
function addSomething(a: Combinable, b: Combinable): Combinable {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = addSomething('Cristian', ' Martin');
result.split(' ');
