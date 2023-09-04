// https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.md

type MyOmit<T, K extends keyof T = keyof T> = {
    [key in keyof T as key extends K ? never : key]: T[key];
};

type TodoPreview = MyOmit<TodoOmit, 'description' | 'title'>;

const todo: TodoPreview = {
    completed: false,
};

/* _____________ Test Cases _____________ */
import type {Equal, Expect} from '@type-challenges/utils';

type cases = [Expect<Equal<Expected1, MyOmit<TodoOmit, 'description'>>>, Expect<Equal<Expected2, MyOmit<TodoOmit, 'title' | 'description'>>>];

interface TodoOmit {
    title: string;
    description: string;
    completed: boolean;
}

interface Expected1 {
    title: string;
    completed: boolean;
}

interface Expected2 {
    completed: boolean;
}
