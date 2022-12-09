function mergeWithConstraints<T extends object, U extends object>(objA: T, objB: U): T & U {
    return Object.assign(objA, objB);
}

const mergedObjCon = mergeWithConstraints({name: 'Max', hobbies: ['Sports']}, {age: 30});
console.log('🚀 ~ file: generics.ts ~ line 6 ~ mergedObj', mergedObjCon);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
