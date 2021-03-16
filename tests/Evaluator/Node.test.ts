import {Node} from "../../src";

const nodeValuesProvider: Array<[any, string]> = [
  ['one', 'one'],
  [1, '1'],
  [1.456, '1.456'],
  [[1, 2, 3], '1, 2, 3']
]

describe.each(nodeValuesProvider)(
  'node value %o toString == %o',
  (value, expected) => {
    it('node.toString', () => {
      const n = new Node({});
      n.value = value;
      expect(n.toString()).toBe(expected);
    })
  }
)
