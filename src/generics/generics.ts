function merge<T, U>(objA: T, objB: U): T & U {
  return { ...objA, ...objB };
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log('🚀 ~ file: generics.ts ~ line 6 ~ mergedObj', mergedObj);
