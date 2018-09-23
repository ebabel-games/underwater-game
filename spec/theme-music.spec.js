import { describe, it } from 'mocha';
import chai from 'chai';
const assert = chai.assert;

import { themeMusic } from '../client/src/modules/theme-music.js';

describe('theme-music', () => {
  it('requires a camera', () => {
    // Mocking.
    const volume = 2;
    // Call code to test.
    const result = themeMusic({volume});
    // console.log(`1: ${JSON.stringify(result)}`);  
    // Check result of calling that code.
    assert(result === undefined);
  });
});
