const { themeMusic } = require('../client/src/modules/theme-music');

test('theme-music requires a camera should return undefined', () => {
  // Mocking.
  const volume = 2;

  // Call code to test.
  const result = themeMusic({volume});

  // Check result of calling that code.
  expect(result).toBe(undefined);
});
