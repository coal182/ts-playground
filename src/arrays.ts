import {InvalidStateError} from './errors';

export function arrayMethods(): void {
    /**
     * MAP
     */

    console.log('MAP');

    const arrayMap = [10, 20, 30];
    const newArray = arrayMap.map((number) => number + 1);
    console.log(newArray);
    // Prints [11, 21, 31]

    console.log('MAP 2');

    const arrayMap2 = [10, 20, 30];
    arrayMap2.map(
        function (number, index, arr) {
            console.log(number + 1, index, arr);
        },
        {name: 'Javascript'}
    );
    // Prints:
    // 11 0 [10, 20, 30] {name: "Javascript"}
    // 21 1 [10, 20, 30] {name: "Javascript"}
    // 31 2 [10, 20, 30] {name: "Javascript"}

    console.log('MAP 3');

    const arrayMap3 = [10, 20, 30];
    arrayMap3.map(
        (number, index, arr) => {
            return console.log(number + 1, index, arr);
        },
        {name: 'Javascript'}
    );
    // Prints:
    // 11 0 [10, 20, 30] Window Object {...}
    // 21 1 [10, 20, 30] Window Object {...}
    // 31 2 [10, 20, 30] Window Object {...}

    /**
     * FOREACH
     */

    console.log('FOREACH');

    const arrayForEach = [10, 20, 30];
    const calculateSomething = (number: number): number => number + 1;
    arrayForEach.forEach((number) => calculateSomething(number));

    function findHighestNumber(array: Array<number>): number {
        let highestNumber = 0;
        array.forEach((number) => {
            if (number > highestNumber) {
                highestNumber = number;
            }
        });
        return highestNumber;
    }
    console.log(findHighestNumber([10, 20, 555]));

    /**
     * REDUCE
     */

    console.log('REDUCE');

    const arrayReduce = [10, 20, 30];
    const total = arrayReduce.reduce((accumulator, number) => {
        return accumulator + number;
    });
    console.log(total);
    // Prints 60

    console.log('REDUCE DICTIONARY');

    const screenIds = ['screen-id-1', 'screen-id-2', 'screen-id-3'];

    const screens = [
        {
            type: 'ScreenDocument',
            siteId: 'siteId-1',
            screenId: 'screenId-1',
            networkType: 'publicVideoInfoscreen',
            faceId: 'faceId-1',
        },
        {
            type: 'ScreenDocument',
            siteId: 'siteId-2',
            screenId: 'screenId-2',
            networkType: 'publicVideoInfoscreen',
            faceId: 'faceId-2',
        },
    ];

    const qualifiedScreens = screens.reduce((dictionary, screen) => {
        //console.log(dictionary);
        if (!screen.faceId) {
            throw new InvalidStateError('One or more screenDocuments provided does not have property faceId. Please check it');
        }

        return {
            ...dictionary,
            [screen.screenId]: {
                faceId: screen.faceId,
                networkType: screen.networkType,
            },
        };
    }, {});

    console.log(qualifiedScreens);

    /**
     * FIND
     */

    console.log('FIND');

    interface NumberDict {
        number: number;
    }

    const arrayFind: Array<NumberDict> = [{number: 10}, {number: 20}, {number: 30}, {number: 40}];
    const singleValue = arrayFind.find((el) => el.number === 30);
    console.log(singleValue);
    // Prints {number: 30}

    /**
     * FILTER
     */

    console.log('FILTER');

    const arrayFilter = [10, 20, 30, 40];
    const filteredValues = arrayFilter.filter((number) => number > 20);
    console.log(filteredValues);
    // Prints [30, 40]

    /**
     * EVERY
     */

    console.log('EVERY');

    const ages = [32, 33, 16, 40];

    function checkAge(age: number): boolean {
        return age > 18;
    }

    const resultEvery = ages.every(checkAge);

    console.log(resultEvery);

    console.log('SOME');
    const resultSome = ages.some(checkAge);

    console.log(resultSome);

    console.log('EVERY 2');

    interface AnswerDict {
        answer: string;
    }

    const survey = [
        {name: 'Steve', answer: 'Yes'},
        {name: 'Jessica', answer: 'Yes'},
        {name: 'Peter', answer: 'Yes'},
        {name: 'Elaine', answer: 'No'},
    ];

    function isSameAnswer(el: AnswerDict, index: number, arr: AnswerDict[]): boolean {
        if (index === 0) {
            return true;
        } else {
            return el.answer === arr[index - 1].answer;
        }
    }

    const resultEvery2 = survey.every(isSameAnswer);
    console.log(resultEvery2);

    console.log('SOME 2');

    const resultSome2 = survey.some(isSameAnswer);
    console.log(resultSome2);

    console.log('PUSH');

    const arrayPush = [10, 20, 30];

    arrayPush.push(40);

    console.log(arrayPush);

    console.log('POP');

    const arrayPop = [10, 20, 30];

    arrayPop.pop();

    console.log(arrayPop);

    console.log('SHIFT');

    const arrayShift = [10, 20, 30];

    arrayShift.shift();

    console.log(arrayShift);

    console.log('UNSHIFT');

    const arrayUnshift = [10, 20, 30];

    arrayUnshift.unshift(40);

    console.log(arrayUnshift);
}
