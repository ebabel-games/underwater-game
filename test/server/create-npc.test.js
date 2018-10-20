'strict';

const { mockIo } = require('ebabel');

const createNpc = require('../../server/create-npc');

let io;

beforeEach(() => {
  io = mockIo;
});

test('createNpc creates a wisp by default.', () => {
  const result = createNpc(io);
  expect(result.name).toBe('a wisp');
  expect(result.constructor.name).toBe('Wisp');
});

test('createNpc creates a blessed wisp when supplied with the appropriate input.', () => {
  const result = createNpc(io, 'a blessed wisp');
  expect(result.name).toBe('a blessed wisp');
  expect(result.constructor.name).toBe('BlessedWisp');
});

test('createNpc creates an evil wisp when supplied with the appropriate input.', () => {
  const result = createNpc(io, 'an evil wisp');
  expect(result.name).toBe('an evil wisp');
  expect(result.constructor.name).toBe('EvilWisp');
});
