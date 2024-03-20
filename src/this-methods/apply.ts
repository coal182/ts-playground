export function thisMethods(): void {
  function sayHello(greet: string, msg: string) {
    console.log(`${greet} ${this.name} ! ${msg}`);
  }

  const obj = {
    name: 'Cristian',
  };

  console.log('📌 CALL');
  sayHello.call(obj, 'Hello', 'Good Morning');
  // Hello Cristian ! Good Morning

  console.log('📌 APPLY');
  sayHello.apply(obj, ['Hello', 'Good Morning']); // Same as call but params is array
  // Hello Cristian ! Good Morning

  console.log('📌 BIND');
  const newFunc = sayHello.bind(obj); // it won't invoke, it just returns back the new function instance

  newFunc('Hello', 'Good Morning');
  // Hello Cristian ! Good Morning
}
