import { describe, it } from 'mocha';
import chai from 'chai';
const assert = chai.assert;

import { light } from '../client/src/modules/light.js';

describe('light', () => {
  it('sets the expected default name of light', () => {
    // Mocking.
    const THREE = { PointLight: class PointLight { constructor() { this.position = { set: () => {} } } } };
    const scene = { add: () => {} };

    // Call code to test.
    const result = light({ THREE, scene });

    // Check result of calling that code.
    assert(result.name === 'main-light');
  });
});
