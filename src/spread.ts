export function spread() {

    var parts = ['shoulders', 'knees'];
    var lyrics = ['head', ...parts, 'and', 'toes'];
    console.log(lyrics); // ['head', 'shoulders', 'knees', 'and', 'toes']

    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    arr1 = [...arr1, ...arr2];
    console.log(arr1); // [0, 1, 2, 3, 4, 5]

    var obj1 = { foo: 'bar', x: 42 };
    var obj2 = { foo: 'baz', y: 13 };

    var clonedObj = { ...obj1 };
    console.log(clonedObj); // { foo: 'bar', x: 42 }

    var mergedObj = { ...obj1, ...obj2 };
    console.log(mergedObj); // { foo: 'baz', x: 42, y: 13 }
    
}
