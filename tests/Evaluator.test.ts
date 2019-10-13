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
