const { describe, it } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const game = require('../client/src/game.js');

describe('game', () => {
  it('should return the expected version', () => {
    console.log(game);
  });
});
