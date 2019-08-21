import Excellent from "../../../../src/Evaluator/NodeEvaluator/MethodNodeEvaluator/MethodNodeHandlers/Excellent";

const handler = new Excellent;

const wordProvider : Array<[string, number, boolean, string]> = [
	['hello cow-boy', 2, false, 'cow'],
	['hello cow-boy', 2, true, 'cow-boy'],
	['hello cow-boy', -1, false, 'boy'],
];

describe.each(wordProvider)(
	'%#: word(%s, %d, %s) : %s',
	(string, number, bySpaces, expected) => {
		it('excellent word function', () => {
			expect(handler.word(string, number, bySpaces)).toEqual(expected);
		});
	}
)

