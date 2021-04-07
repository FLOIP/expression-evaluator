import {EvaluatorFactory} from "../../src";
import mockdate from 'mockdate';
import moment from "moment";

const evaluator = EvaluatorFactory.create();

it('evaluates member access', () => {
  const expression = 'Hello @contact.name';
  const context = {
    contact: {
      name: 'Kyle',
    }
  };
  const expected = 'Hello Kyle';

  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

it('evaluates method', () => {
  const now = moment();
  mockdate.set(now.toDate());

  const expression = 'Today is @(NOW())';
  const expected = `Today is ${now.toString()}`;
  const context = {};

  expect(evaluator.evaluate(expression, context)).toBe(expected);

  mockdate.reset();
})

it('evaluates method with args', () => {
  const expression = 'Today is @(DATE(2012,12,12))';
  const expected = `Today is ${moment('2012-12-12').toString()}`;
  const context = {};

  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

it('Evaluates nested method', () => {
  const now = moment().startOf('day');
  const expression = 'Today is @(DATE(YEAR(NOW()), MONTH(NOW()), DAY(NOW())))';
  const expected = `Today is ${now.toString()}`
  const context = {};

  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

it('EvaluatesMultipleMethods', () => {
  const now = moment();
  const nowString = moment(now).startOf('day').toString();
  const expression = 'Today is @(DATE(YEAR(NOW()), MONTH(NOW()), DAY(NOW()))), or just @(NOW())';
  const expected = `Today is ${nowString}, or just ${now.toString()}`;
  const context = [];

  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

it('EvaluatesMethodWithMemberArg', () => {
  const now = moment();
  const nowString = moment(now).startOf('day').toString();
  const expression = 'Today is @(DATE(contact.year, contact.month, contact.day))';
  const expected = `Today is ${nowString}`;
  const context = {
    contact: {
      year: now.year(),
      month: now.month() + 1,
      day: now.date()
    }
  };

  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

it('EvaluatesDateStringContext', () => {
  const now = moment('2020-02-14');
  const nowString = moment(now).toString();
  const expression = "7 days from today is @(date.today + '7 days')";
  const expected = `7 days from today is ${nowString}`;
  const context = {
    date: {
      today: '2020-02-07'
    }
  };
  expect(evaluator.evaluate(expression, context)).toBe(expected);
})

const testTemplate = '%#: %s : %s';
const contextTest = '%#: %s [%o] : %s';

const mathFnProvider: Array<[string, number]> = [
  ['@(abs(-6))', 6],
  ['@(max(6, 19, 7))', 19],
  ['@(min(7, 6, 19))', 6],
  ['@(power(2,2))', 4],
  ['@(sum(2,3,4))', 9],
]

describe.each(mathFnProvider)(
  testTemplate,
  (expression, expected) => {
    it('evaluates math function', () => {
      expect(evaluator.evaluate(expression, {})).toBe(expected.toString());
    });
  }
)

const logicProvider: Array<[string, object, string]> = [
  ['@(and(contact.gender = "f", contact.age >= 10))', {
    contact: {
      gender: 'f',
      age: '9',
    }
  }, 'FALSE'
  ],
  ['@(and(1 = 1, 3 = 3))', {}, 'TRUE']
]

describe.each(logicProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates logic functions', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const textMethodProvider: Array<[string, Object, string]> = [
  [
    'As easy as @(CHAR(65)), @(CHAR(66)), @(CHAR(67))',
    {},
    'As easy as A, B, C'
  ],
  [
    'You entered @(CLEAN(step.value))',
    {
      step: {
        value: "\n\t\rABC"
      }
    },
    'You entered ABC'
  ],
  [
    'The numeric code of A is @(CODE("A"))',
    {},
    'The numeric code of A is 65'
  ],
  [
    'Your name is @(CONCATENATE(contact.first_name, " ", contact.last_name))',
    {
      contact: {
        first_name: 'Big',
        last_name: 'Papa',
      }
    },
    'Your name is Big Papa'
  ],
  [
    '@(CONTAINS(contact.needle, contact.haystack))',
    {
      contact: {
        needle: 'Raptors',
        haystack: 'Toronto Raptors',
      }
    },
    'TRUE'
  ],
  [
    'You have @(FIXED(contact.balance, 2)) in your account',
    {
      contact: {
        balance: '4.209922'
      }
    },
    'You have 4.20 in your account'
  ],
  [
    'You entered PIN @(LEFT(step.value, 4))',
    {
      step: {
        value: '1234567'
      }
    },
    'You entered PIN 1234'
  ],
  [
    'You entered @(LEN(step.value)) characters',
    {
      step: {
        value: '7654321'
      }
    },
    'You entered 7 characters'
  ],
  [
    'Welcome @(LOWER(contact))',
    {
      contact: {
        __value__: 'JOHN'
      }
    },
    'Welcome john'
  ],
  [
    'Your name is @(PROPER(contact))',
    {
      contact: {
        __value__: 'jAcOb JoNeS'
      }
    }
    , 'Your name is Jacob Jones'
  ],
  [
    'Stars! @(REPT("*", 10))',
    {},
    'Stars! **********'
  ],
  [
    'Your input ended with ...@(RIGHT(step.value, 3))',
    {
      step: {
        value: 'Hello World'
      }
    },
    'Your input ended with ...rld'
  ],
  [
    '@(SUBSTITUTE(step.value, "can\'t", "can"))',
    {
      step: {
        value: 'I can\'t do it'
      }
    },
    'I can do it'
  ],
  [
    'WELCOME @(UPPER(contact))!!',
    {
      contact: {
        __value__: 'home'
      }
    },
    'WELCOME HOME!!'
  ]
]

describe.each(textMethodProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evlaluates text methods', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const mathExpressionProvider: Array<[string, object, string]> = [
  [
    '2 + 2 is @(2 + 2)', {}, '2 + 2 is 4'
  ],
  [
    '@((2 + 4) / 2) is 3', {}, '3 is 3'
  ],
  [
    '@(contact.age + 1) is your age next year', {
    contact: {age: 27}
  }, '28 is your age next year',
  ],
  [
    '@(SUM(2,2) + 4) is 8', {}, '8 is 8'
  ],
  [
    '@(2 + 4 * 2) is 10', {}, '10 is 10'
  ],
  [
    '@((2 + 4) * 2) is 12', {}, '12 is 12'
  ],
  [
    '@(1 + (2 - 3) * 4 / 5 ^ 6)', {}, '0.999744'
  ]
];

describe.each(mathExpressionProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates math expressions', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const escapeProvider: Array<[string, object, string]> = [
  ['Follow us @@twitterHandle', {}, 'Follow us @twitterHandle'],
  ['Email us @@ contact@@example.com', {}, 'Email us @ contact@example.com'],
]

describe.each(escapeProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates escape nodes', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const concatenationExpressionProvider: Array<[string, object, string]> = [
  ['@("Hello " & "World")', {}, 'Hello World'],
  ['@("One" & " " & "Two")', {}, 'One Two'],
  ['@(context.firstname & " " & context.lastname)', {
    context: {firstname: 'John', lastname: 'Smith'}
  }, 'John Smith'],
  ['@("Two plus" & " " & "two: " & 2 + 2)', {}, 'Two plus two: 4']
]

describe.each(concatenationExpressionProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates concatenation nodes', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const flowExpressionProvider: Array<[string, object, string]> = [
  [
    '@(OR(AND(channel.mode = "ivr", block.value = "7"), AND(channel.mode != "ivr", OR(AND(flow.language = "5", LOWER(block.value)="yup"), AND(flow.language = "5", LOWER(block.value)="1"), AND(flow.language = "5", LOWER(block.value)="yes"), AND(flow.language = "6", LOWER(block.value)="aane"), AND(flow.language = "6", LOWER(block.value)="1"), AND(flow.language = "6", LOWER(block.value)="a")))))',
    {
      flow: {
        language: 5
      },
      block: {
        value: 'YUP'
      },
    },
    'TRUE'
  ],
  [
    "@(OR(AND(channel.mode = 'ivr', block.value = '7'), AND(channel.mode != 'ivr', OR(AND(flow.language = '5', LOWER(block.value)='yup'), AND(flow.language = '5', LOWER(block.value)='1'), AND(flow.language = '5', LOWER(block.value)='yes'), AND(flow.language = '6', LOWER(block.value)='aane'), AND(flow.language = '6', LOWER(block.value)='1'), AND(flow.language = '6', LOWER(block.value)='a')))))",
    {
      flow: {
        language: 5
      },
      block: {
        value: 'YUP'
      },
    },
    'TRUE'
  ]
]

describe.each(flowExpressionProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates flow expressions', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const typeAssertProvider: Array<[string, object, string]> = [
  [
    '@(isnumber(val.num))',
    {val: {num: '3'}},
    'TRUE'
  ],
  [
    '@(isnumber("5"))',
    {},
    'TRUE'
  ],
  [
    '@(isnumber(val.str))',
    {val: {str: 'nope'}},
    'FALSE'
  ],
  [
    '@(isstring("yep"))',
    {},
    'TRUE'
  ],
  [
    '@(isstring(val.num))',
    {val: {num: '3'}},
    'FALSE'
  ],
  [
    '@(isbool(val.boo))',
    {val: {boo: true}},
    'TRUE'
  ],
  [
    '@(isbool(val.boo))',
    {val: {boo: 'nope'}},
    'FALSE'
  ],
  [
    '@(isbool("TRUE"))',
    {},
    'TRUE'
  ],
  [
    '@(isbool("FALSE"))',
    {},
    'TRUE'
  ]
  ,
  [
    '@(AND(isbool("TRUE"), isstring("foo"), isnumber("5")))',
    {},
    'TRUE'
  ]
]

describe.each(typeAssertProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates type assertion expressions', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const nullExpressionProvider: Array<[string, object, string]> = [
  [
    '@(contact.name = NULL)',
    {contact: {name: null}},
    'TRUE'
  ],
  [
    '@(contact.name = NULL)',
    {contact: {name: 'Kyle'}},
    'FALSE'
  ],
  [
    '@(NULL)',
    [],
    'NULL'
  ]
]

describe.each(nullExpressionProvider)(
  contextTest,
  (expression, context, expected) => {
    it('evaluates null expressions', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const bugScrubProvider: Array<[string, any, string]> = [
  // a bug was disovered that caused an exception to be thrown
  [
    `@flow.mcq.value
		@flow.1570165060485_42.value
		@flow.jskey_1570165060485_42.value
		@flow.mcq`,
    {flow: {mcq: {value: 'foobar', __value__: 'foobar'}}},
    `foobar
		flow.1570165060485_42.value
		flow.jskey_1570165060485_42.value
		foobar`
  ]
]

describe.each(bugScrubProvider)(
  'bug scrub %#',
  (expression, context, expected) => {
    it(`does not regress a bug`, () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected);
    })
  }
)

const stringDateMathProvider: Array<[string, object, string]> = [
  [
    'Tomorrow is @(DATEVALUE("2020-01-01") + "1 day")',
    {},
    `Tomorrow is ${moment('2020-01-01', 'YYYY-MM-DD').add(1, 'day').toString()}`
  ],
  [
    'Tomorrow is @(DATEVALUE("2020-01-01") + "1 week")',
    {},
    `Tomorrow is ${moment('2020-01-01', 'YYYY-MM-DD').add(1, 'week').toString()}`
  ],
  [
    'Tomorrow is @(DATEVALUE("2020-01-01") + "1 month")',
    {},
    `Tomorrow is ${moment('2020-01-01', 'YYYY-MM-DD').add(1, 'month').toString()}`
  ],
  [
    'Tomorrow is @(DATEVALUE("2020-01-01") + "1 hour")',
    {},
    `Tomorrow is ${moment('2020-01-01', 'YYYY-MM-DD').add(1, 'hour').toString()}`
  ]
]

it('casts string on split_word', () => {
  const now = (new Date('2020-01-01 00:00:00')).getTime()
  jest.spyOn(Date, 'now').mockReturnValue(now)

  const expected = "Today in simple date: Jan 01 2020"

  expect(evaluator.evaluate("Today in simple date: @(word_slice(today(),2,5,true))", {})).toBe(expected)
})

describe.each(stringDateMathProvider)(
  'string math %#',
  (expression, context, expected) => {
    it('does string date math', () => {
      expect(evaluator.evaluate(expression, context)).toBe(expected)
    })
  }
)

it('testInGroupsNestedMemberObject', () => {
	const trueCase = '@(IN(groups.group, contact.groups))'
	const falseCase = '@(IN(groups.group2, contact.groups))'
	const context = {
		'groups': {
			'group': {
				'__value__': 'group0'
			},
			'group1': {
				'__value__': 'group1'
			},
			'group2': {
				'__value__': 'group2'
			}
		},
		'contact': {
			'groups': {
				'group0': {
					'__value__': 'group0'
				},
				'group1': {
					'__value__': 'group1'
				}
			}
		}
	}

	expect(evaluator.evaluate(trueCase, context)).toBe('TRUE');
	expect(evaluator.evaluate(falseCase, context)).toBe('FALSE')
	expect(evaluator.evaluate('@(COUNT(contact.groups))', context)).toBe('2')
})
