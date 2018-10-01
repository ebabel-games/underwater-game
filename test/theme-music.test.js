const { themeMusic } = require('../client/src/modules/theme-music');

let volume;

beforeEach(() => {
  volume = 2;
});

test('theme-music requires a camera should return undefined', () => {
  const result = themeMusic({ volume });
  expect(result).toBe(undefined);
});
