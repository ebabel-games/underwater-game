const { describe, it } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const game = require('../client/src/game.js');

describe('game', () => {
  it('exists', () => {
    assert(game !== undefined);
    // todo: read documentation on http://teejayvanslyke.com/how-to-set-up-a-test-runner-for-modern-javascript.html
  });
});
