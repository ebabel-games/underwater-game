import { describe, it } from 'mocha';
import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

import { game } from '../client/src/game.js';

console.log('hello game test');

describe('game', () => {
  it('exists', () => {
    assert(game !== undefined);
    assert(game === 1);
  });
});
