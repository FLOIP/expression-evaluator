import {LOGIC_TYPE, LogicNodeEvaluator, Node, NodeEvaluator} from "../../../src";

const evaluator: NodeEvaluator = new LogicNodeEvaluator;

const makeNode = (lhs: number | string, rhs: number | string, operator: string) => {
  return new Node({
    type: LOGIC_TYPE,
    lhs,
    rhs,
    operator
  });
}

const logicProvider: Array<[Node, boolean]> = [
  [
    makeNode(3, 2, '>'),
    true
  ],
  [
    makeNode(3, 2, '<'),
    false
  ],
  [
    makeNode(3, 2, '<='),
    false
  ],
  [
    makeNode(3, 3, '<='),
    true
  ],
  [
    makeNode(3, 2, '>='),
    true
  ],
  [
    makeNode(3, 3, '>='),
    true
  ],
  [
    makeNode(2, 2, '='),
    true
  ],
  [
    makeNode(2, 2, '!='),
    false
  ],
  [
    makeNode(2, 2, '<>'),
    false
  ],
  [
    makeNode('foo', 'FOO', '='),
    true
  ]

]

describe.each(logicProvider)(
  '%#: node: %o context: %o => %s',
  (node, expected) => {
    it('evaluates member node with key and value', () => {
      expect(evaluator.evaluate(node, {})).toEqual(expected);
    });
  },
);
