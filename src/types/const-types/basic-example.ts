// From: https://pro.codely.com/library/typescript-avanzado-mejora-tu-developer-experience-204725/
/* eslint-disable @typescript-eslint/no-unused-vars */
// Example with "as const"
type User = { name: string; age: number };

function getUserName<T extends User>(user: T): T['name'] {
  return user.name;
}

const userName = getUserName({ name: 'Cristian', age: 32 } as const);
//      ^?

// Ejemplo const type parameter
function getUserAge<const T extends User>(user: T): T['age'] {
  return user.age;
}

const userAge = getUserAge({ name: 'Cristian', age: 32 });
//     ^?

// Ejemplo con array y readonly
// En este ejemplo es importante combinar el const con el readonly  porque si no el array sería
// mutable dentro de la función y no se infiere el tipo
type HasNames = { names: readonly string[] };
function getNamesExactly<const T extends HasNames>(arg: T): T['names'] {
  return arg.names;
}

const names = getNamesExactly({ names: ['Javi', 'Ronny', 'Isma'] });
//      ^?
