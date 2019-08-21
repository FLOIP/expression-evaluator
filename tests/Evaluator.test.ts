import {Evaluator} from '../src/Evaluator';
import {parse} from 'floip-parser/dist/Parser';

const evaluator = new Evaluator(parse);

it('returns a string from an expression', () => {
	expect(evaluator.evaluate('Hello World', {}))
	.toEqual('Hello World');
});

it('evaluates an expression with context member access', () => {
	expect(evaluator.evaluate('Hello @contact.name', {contact: {name: 'Kyle'}}))
	.toEqual('Hello Kyle');
});
