test('basic', () => {
  expect('John').toBe('John');
});

test('Failed', () => {
  expect('Hello ').toBe('Hello ');
});
