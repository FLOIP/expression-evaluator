import EvaluatorFactory from '../src/Evaluator/Factory';
import { Evaluator } from '../src/Evaluator';

const evaluator : Evaluator = EvaluatorFactory.create();

it('returns a string from an expression', () => {
	expect(evaluator.evaluate('Hello World', {}))
	.toEqual('Hello World');
});

it('evaluates an expression with context member access', () => {
	expect(evaluator.evaluate('Hello @contact.name', {contact: {name: 'Kyle'}}))
	.toEqual('Hello Kyle');
});

it('evaluates a default exit block', () => {
	expect(evaluator.evaluate('@(TRUE)', {})).toEqual('TRUE');
});

it('evaluates empty member variable', () => {
	expect(evaluator.evaluate('@(contact.name = NULL)', {
		contact: {
			name: ''
		}
	})).toEqual('TRUE');
})

it('handles the IN operator', () => {
	expect(evaluator.evaluate("@(IN('42', ARRAY('1','2','42','5')))", {})).toEqual('TRUE')
})

it('handles type coercion gracefully', () => {
	expect(evaluator.evaluate("@(IN('42', ARRAY(flow.mcq)))", {
		flow: {
			mcq: 42
		}
	})).toEqual('TRUE')
})
