import {Evaluator, EvaluatorFactory} from '../src';
import moment from 'moment';

const evaluator: Evaluator = EvaluatorFactory.create();

const TRUE = 'TRUE'
const FALSE = 'FALSE'

it('returns a string from an expression', () => {
  expect(evaluator.evaluate('Hello World', {}))
    .toEqual('Hello World');
});

it('evaluates an expression with context member access', () => {
  expect(evaluator.evaluate('Hello @contact.name', {contact: {name: 'Kyle'}}))
    .toEqual('Hello Kyle');
});

it('evaluates a default exit block', () => {
  expect(evaluator.evaluate('@(TRUE)', {})).toEqual(TRUE);
});

it('evaluates empty member variable', () => {
  expect(evaluator.evaluate('@(contact.name = NULL)', {
    contact: {
      name: ''
    }
  })).toEqual(TRUE);
})

it('handles the IN operator', () => {
  expect(evaluator.evaluate("@(IN('42', ARRAY('1','2','42','5')))", {})).toEqual(TRUE)
})

it('handles type coercion gracefully', () => {
  expect(evaluator.evaluate("@(IN('42', ARRAY(flow.mcq)))", {
    flow: {
      mcq: 42
    }
  })).toEqual(TRUE)
})

const betweenProvider: Array<[string, string]> = [
  ['@(BETWEEN(DATE(2020, 08, 07), DATE(2020, 07, 01), DATE(2020, 09, 01)))', TRUE],
  ['@(BETWEEN(DATE(2020, 10, 07), DATE(2020, 07, 01), DATE(2020, 09, 01)))', FALSE],
  ["@(BETWEEN(DATEVALUE('2020-08-07'), DATEVALUE('2020-07-01'), DATEVALUE('2020-09-01')))", TRUE],
  ["@(BETWEEN(DATEVALUE('2020-10-07'), DATEVALUE('2020-07-01'), DATEVALUE('2020-09-01')))", FALSE]
]

describe.each(betweenProvider)(
  '%#: BETWEEN(%s) : %s',
  (expression, expected) => {
    test('handles BETWEEN two dates', () => {
      expect(evaluator.evaluate(expression, {})).toEqual(expected)
    })
  }
)

it('VMO-2640: time arithmetic', () => {
  const context = {
    date: {
      today: '2020-01-31'
    }
  }
  const exp = `@(DATEVALUE(date.today) + "7 days")`
  const exp2 = `@(MONTH(DATEVALUE(date.today) + "7 days") > MONTH(DATEVALUE(date.today)))`
  const expExpected = moment('2020-01-31', 'YYYY-MM-DD').add(7, 'days').toString()

  expect(evaluator.evaluate(exp, context)).toEqual(expExpected)
  expect(evaluator.evaluate(exp2, context)).toEqual(TRUE)
})

it('bug scrub', () => {
  const c = {
    flow: {
      temperature: {
        __value__: "Above 39 : body is very hot "
      }
    }
  }

  const e = "@(AND(flow.temperature = \"Above 39 : body is very hot \"))"

  expect(evaluator.evaluate(e, c)).toBeTruthy()
})

it('throws something on undefined input', () => {
	//@ts-ignore
	expect(() => {evaluator.evaluate(undefined, {})}).toThrow()

	//@ts-ignore
	expect(() => {evaluator.evaluate('', undefined)}).toThrow()
})

it('true/false mcq', () => {
	expect(evaluator.evaluate('True', {})).toBe('True')
	expect(evaluator.evaluate('False', {})).toBe('False')
})
