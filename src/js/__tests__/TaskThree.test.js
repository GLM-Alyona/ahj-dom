import TaskThree from '../modules/TaskThree';

test('test new TaskThree element', () => {
  const expected = 'test';
  const received = new TaskThree(expected);

  expect(received.element).toEqual(expected);
});
