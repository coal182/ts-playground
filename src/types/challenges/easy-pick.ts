// https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md

type MyPick<T, K extends keyof T> = {
    [key in K]: T[key];
};

type test2 = MyPick<TodoPick, 'completed'>; // autocompletes K

interface TodoPick {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPickPreview = MyPick<TodoPick, 'title' | 'completed'>;

const todos: TodoPickPreview = {
    title: 'Clean room',
    completed: false,
};
