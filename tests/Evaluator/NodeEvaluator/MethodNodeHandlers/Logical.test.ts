import Logical from '../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/Logical'

const handler = new Logical;

const andProvider : Array<[Array<any>, boolean]> = [
	[[true, true], true],
	[[true, false], false]
]

describe.each(andProvider)(
	'%#: and(%o) : %s',
	(args, expected) => {
		test('and', () => {
			expect(handler.and(...args)).toBe(expected);
		})
	}
)
