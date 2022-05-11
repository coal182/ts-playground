import { expect, assert } from 'chai';
import { Queue } from './queue';

describe.only(Queue.name, () => {

    const ELEMENT = 'queue-element';

    let queue = new Queue();
    
    it("Can be initializable", () => {

        assert.instanceOf(queue, Queue, 'queue is an instance of Queue');

    });

});
