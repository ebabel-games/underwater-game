import { describe, it } from 'mocha';
import chai from 'chai';
const assert = chai.assert;

import { world } from '../client/src/modules/world.js';

describe('world', () => {
  it('sets the expected default name of world', () => {
    // Mocking.
    const THREEx = { WindowResize: class WindowResize { constructor() { } } };
    const THREE = { PointLight: class PointLight { constructor() { this.position = { set: () => {} } } } };
    //const scene = { add: () => {} };

    // Call code to test.
    const result = world({ THREE, THREEx });

    // Check result of calling that code.
    assert(result.name === 'main-world');
  });
});
