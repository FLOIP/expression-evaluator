# Flow Interoperability Project (FLOIP) Expression Evaluator


## Introduction
The purpose of the project is to enable useful interoperability between Flow-based platforms, and to incentivize the 
joining of future software tools into an interoperable ecosystem. We will accomplish this through a set of open 
specifications, and a set of open-source toolsets that reduce barriers to adoption. The initial focus is on tools for 
mobile/web engagement, although the most basic layer of the specification is general and can represent non-mobile 
business logic.

## What are Expressions?

While a flow paradigm is useful in representing control logic in an easy to understand manner for non-technical users, 
there is a need to both refer to variables collected within other parts of a flow and transform them in basic ways.


Further reading at [Flow Specification Gitbook: Expressions](https://floip.gitbooks.io/flow-specification/content/fundamentals/expressions.html)

## Basic Expression Evaluator Usage

The expression evaluator expects two arguments:
- `expression` — a string containing a Flow Specification compatible expression within it. 
- `context` — an object whose values can be referenced by the provided expression. 

```typescript
import {EvaluatorFactory} from '@floip/expression-evaluator'

const expr = 'Hello @(first_word(contact.name))!'
const ctx = {
    contact: {name: 'Marshawn Lynch'}
}

EvaluatorFactory.create()
    .evaluate(expr, ctx) // 'Marshawn'
```
