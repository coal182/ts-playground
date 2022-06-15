import _ from 'lodash';

export function lodashMethods(): void {
    /**
     * _.cloneDeep
     */

    console.log('_.cloneDeep');

    const objects = [{a: 1}, {b: 2}];
    const deep = _.cloneDeep(objects);
    console.log(deep[0] === objects[0]);

    /**
     * _.flatten  Flattens array a single level deep.
     */

    console.log('_.flatten');

    const multidimensionalArray = [1, [2, [3, [4]], 5]];
    const flatten = _.flatten(multidimensionalArray);
    console.log(flatten);

    /**
     * _.flattenDeep Recursively flattens array.
     */

    console.log('_.flattenDeep');
    const flattenDeep = _.flattenDeep(multidimensionalArray);
    console.log(flattenDeep);

    /**
     * _.forEach Iterates over elements of collection and invokes iteratee for each element. The iteratee is invoked with three arguments: (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.
     */

    console.log('_.forEach');
    _.forEach([1, 2], function (value) {
        console.log(value);
    });
    // => Logs `1` then `2`.

    _.forEach({a: 1, b: 2}, function (value, key) {
        console.log('key:', key);
        console.log('value:', value);
    });
    // => Logs 'a' then 'b' (iteration order is not guaranteed).
}
