import { assert } from 'chai';

import { Queue } from './queue';

describe(Queue.name, () => {
  const ELEMENT = 'queue-element';

  const queue = new Queue();

  it('Can be initializable', () => {
    assert.instanceOf(queue, Queue, 'queue is an instance of Queue');
  });
});
