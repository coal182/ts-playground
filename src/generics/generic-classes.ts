class DataStorage<T> {
    private data: Array<T> = [];

    public addItem(item: T): void {
        this.data.push(item);
    }

    public removeItem(item: T): void {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    public getItems(): Array<T> {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(5);
console.log(numberStorage.getItems());

const objStorage = new DataStorage<object>();
const maxObj = {name: 'Max'};
objStorage.addItem(maxObj);
objStorage.addItem({name: 'Manu'});
objStorage.removeItem(maxObj);
console.log(objStorage.getItems());
