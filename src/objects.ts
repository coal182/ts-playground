export function objectMethods(): void {
  /**
   * Object.fromEntries  (Node -v 14.17.0 required)
   */

  console.log('Object.fromEntries');

  const targetableEntities = ['Publisher', 'Website', 'AdSlot', 'Site'];
  //const targetableEntitiesEnum = Object.fromEntries(targetableEntities.map((value) => [value, value]));
  //console.log(targetableEntitiesEnum);

  const myObject = { foo: 'bar', baz: 42 };

  /**
   * Object.entries
   */

  console.log('Object.entries');

  const entries = Object.entries(myObject);
  console.log(entries);

  entries.forEach(([key, value]) => {
    console.log(`${key} = ${value}`);
  });

  /**
   * Object.keys
   */

  console.log('Object.keys');

  const keys = Object.keys(myObject);
  console.log(keys);

  /**
   * Object.values
   */

  console.log('Object.values');

  const values = Object.values(myObject);
  console.log(values);

  /**
   * Object.freeze
   */

  const obj = {
    prop: 42,
  };

  Object.freeze(obj);

  obj.prop = 33;
  // Throws an error in strict mode

  console.log(obj.prop);
  // expected output: 42
}
