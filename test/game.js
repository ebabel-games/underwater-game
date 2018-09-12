const { describe, it } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const game = require('../client/game.js');

describe('game', () => {
  it('should return the expected version', () => {
    const version = require('../package.json').version;
    assert(game.version === version);
  });
});
