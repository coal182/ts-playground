export function reduces(): void {
  // Sum Numbers

  const numbers = [5, 12, 9, 2, 4];
  const sumNumbers = (arrNumbers: Array<number>) => {
    return arrNumbers.reduce((acc, current) => {
      return acc + current;
    }, 0);
  };

  console.log('Sum numbers', sumNumbers(numbers));

  // Declarative

  function declarative() {
    type Order = { id: number; amount: number };
    type Orders = Array<Order>;
    const orders: Orders = [
      {
        id: 1,
        amount: 100,
      },
      {
        id: 2,
        amount: 200,
      },
      {
        id: 3,
        amount: 300,
      },
    ];

    function sumAmount(currentAmount: Order['amount'], order: Order) {
      return currentAmount + order.amount;
    }

    function getTotalAmount(orders: Orders) {
      return orders.reduce(sumAmount, 0);
    }

    return getTotalAmount(orders);
  }
  console.log('Sum order amounts declarative', declarative());

  // Concat elements
  const numeros = [1, 2, 3, 4, 5];
  const concat = (arrNumeros: Array<number>) => {
    return arrNumeros.reduce((acc, current) => {
      return acc + current;
    }, '');
  };
  console.log('Concat numbers', concat(numeros));

  // Sum coincidences in objects array
  type Voter = { name: string; age: number; voted: boolean };
  const voters: Voter[] = [
    { name: 'Bob', age: 30, voted: true },
    { name: 'Jake', age: 32, voted: true },
    { name: 'Kate', age: 25, voted: false },
    { name: 'Sam', age: 20, voted: false },
    { name: 'Phil', age: 21, voted: true },
    { name: 'Ed', age: 55, voted: true },
    { name: 'Tami', age: 54, voted: true },
    { name: 'Mary', age: 31, voted: false },
    { name: 'Becky', age: 43, voted: false },
    { name: 'Joey', age: 41, voted: true },
    { name: 'Jeff', age: 30, voted: true },
    { name: 'Zack', age: 19, voted: false },
  ];
  const sumCoincidences = (voters: Voter[]) => voters.reduce((acc, current) => acc + (current.voted ? 1 : 0), 0);

  console.log('Sum coincidences', sumCoincidences(voters));

  // Convert matrix into array
  const matrix: Array<Array<string | number | boolean>> = [['1', '2', '3'], [true], [4, 5, 6]];

  const flat = (matrix: Array<Array<string | number | boolean>>) => {
    return matrix.reduce((acc, current) => [...acc, ...current], []);
  };

  console.log('Convert matrix into array (flat): ', flat(matrix));

  // Group by with reduce
  const voters2: Voter[] = [
    { name: 'Bob', age: 30, voted: true },
    { name: 'Jake', age: 32, voted: true },
    { name: 'Kate', age: 25, voted: false },
    { name: 'Sam', age: 20, voted: false },
    { name: 'Phil', age: 21, voted: true },
    { name: 'Ed', age: 55, voted: true },
    { name: 'Tami', age: 54, voted: true },
    { name: 'Mary', age: 31, voted: false },
    { name: 'Becky', age: 43, voted: false },
    { name: 'Joey', age: 41, voted: true },
    { name: 'Jeff', age: 30, voted: true },
    { name: 'Zack', age: 19, voted: false },
  ];

  type GroupedVoters = { young: number; adult: number; mature: number };

  const initialObj: GroupedVoters = { young: 0, adult: 0, mature: 0 };

  const groupByAgeRange = (voters2: Voter[]) => {
    return voters2.reduce((acc: GroupedVoters, current: Voter) => {
      if (current.age >= 18 && current.age <= 25 && current.voted) {
        acc.young++;
      }
      if (current.age >= 26 && current.age <= 35 && current.voted) {
        acc.adult++;
      }
      if (current.age >= 36 && current.age <= 55 && current.voted) {
        acc.mature++;
      }
      return acc;
    }, initialObj);
  };

  console.log('Group by age range: ', groupByAgeRange(voters2));

  // Matrix averages
  const numsMatrix: number[][] = [
    [1, 6, 9, 2, 5, 4],
    [50, 67, 3, 80, 24, 17],
    [100, 77, 50, 35, 12, 56],
  ];

  const matrixAverages = (numsMatrix: number[][]) => {
    return numsMatrix.reduce((acc, current) => {
      const avg = sumNumbers(current) / current.length;
      return [...acc, avg];
    }, []);
  };

  console.log('Matrix averages: ', matrixAverages(numsMatrix));

  // Count booleans
  const booleans = [true, true, false, true, false, true];

  const booleansCounter = (booleans: boolean[]) => {
    return booleans.reduce((acc, current) => acc + (current ? 1 : 0), 0);
  };

  console.log('Count booleans: ', booleansCounter(booleans));

  const booleansCounterV2 = (booleans: boolean[]) => {
    return booleans.reduce((acc: Record<string, any>, current) => {
      acc[current.toString()] = (acc[current.toString()] ?? 0) + 1;
      return acc;
    }, {});
  };

  console.log('Count booleans v2: ', booleansCounterV2(booleans));

  // Convert array to object
  type Person = { name: string; age: number; gender: 'M' | 'F' };
  const people: Person[] = [
    { name: 'Cristian', age: 25, gender: 'M' },
    { name: 'Ana', age: 20, gender: 'F' },
    { name: 'Fernando', age: 15, gender: 'M' },
    { name: 'Alejandra', age: 11, gender: 'F' },
  ];

  const arrayToObjectConverter = (people: Person[]) => {
    return people.reduce((acc: Record<string, any>, { name, age, gender }) => {
      return { ...acc, [name]: { age, gender } };
    }, {});
  };

  console.log('Array to object converter: ', arrayToObjectConverter(people));
}
