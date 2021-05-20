import AutoSuggest from '@avcs/autosuggest'
import {EvaluatorFactory, MethodNodeEvaluatorFactory} from "../../src"
import moment from 'moment'

const input = document.getElementById('input') as HTMLInputElement
const output = document.getElementById('output') as HTMLElement
const err = document.getElementById('error') as HTMLElement

const evaluator = EvaluatorFactory.create()

const defaultContext = {
	contact: {
		name: "Kyle",
		phone: "222-222-2222",
		start_date: "2020-06-03",
		pin: "1234",
		last_visited: "2020-01-01"
	},
	date: {
		today: moment().toLocaleString()
	},
	flow: {
		patients: {
			__value__: "5",
			value: "5"
		},
		vaccines: {
			__value__: "27",
			value: "27"
		},
		entered_pin: {
			__value__: "1234",
			value: "1234"
		},
	}
}

const topLevelContextSuggestions = {
	trigger: '@',
	values: [
		{
			value: '@()',
			focusText: [-1, -1]
		},
		...Array.from(Object.entries(defaultContext)).map(item => `@${item[0]}`)
	]
}

const contextSuggestions = Array.from(Object.entries(defaultContext)).map(item => {
	const name = item[0]
	return {
		trigger: `${name}.`,
		values: Object.getOwnPropertyNames(item[1]).map(val => `${name}.${val}`)
	}
})

const context = document.getElementById('context') as HTMLInputElement

context.value = JSON.stringify(defaultContext, null, 2)

const evaluateButton = document.getElementById("button") as HTMLInputElement

evaluateButton.onclick = () => {
	output.textContent = err.textContent = null
	try {
		const text = input.value
		const out = evaluator.evaluate(text, JSON.parse(context.value))
		output.textContent = out
	} catch (e) {
		err.textContent = e
	}

}

const methods = new Map()

/* eslint-disable no-restricted-syntax */
for (const handler of MethodNodeEvaluatorFactory.defaultHandlers()) {
  for (const method of handler.handles()) {
	const trigger = method.substr(0, 2)
	const upperTrigger = trigger.toUpperCase()
	const upperMethod = method.toUpperCase()
	if (methods.has(trigger)) {
	  methods.set(trigger, [...methods.get(trigger), method])
	  methods.set(upperTrigger, [...methods.get(upperTrigger), upperMethod])
	} else {
	  methods.set(trigger, [method])
	  methods.set(upperTrigger, [upperMethod])
	}
  }
}

const methodSuggestions = Array.from(methods.entries()).map(item => ({
	trigger: item[0],
	values: item[1].map(i => ({
		value: `${i}()`,
		focusText: [-1, -1],
	  })),
  }))

new AutoSuggest({
    caseSensitive: false,
    onChange: function(suggestion) {
        console.log(`"${suggestion.insertHtml || suggestion.insertText}" has been inserted into #${this.id}`);
    },
    suggestions: [
		topLevelContextSuggestions,
		...contextSuggestions,
		...methodSuggestions
    ]
}, input);

const mutateContext = (callback) => {
	const ctx = JSON.parse(context.value)
	callback(ctx)
	context.value =  JSON.stringify(ctx, null, 2)
}

const addContactPropertyName   = document.getElementById("property-name") as HTMLInputElement
const addContactPropertyValue  = document.getElementById("property-value") as HTMLInputElement
const addContactPropertyButton = document.getElementById("contact-property-button") as HTMLInputElement

const addBlockResponseLabel  = document.getElementById("response-label") as HTMLInputElement
const addBlockResponseValue  = document.getElementById("response-value") as HTMLInputElement
const addBlockResponseButton = document.getElementById("block-response-button") as HTMLInputElement

addContactPropertyButton.addEventListener("click", () => {
	mutateContext((ctx) => {
		ctx.contact[addContactPropertyName.value] = addContactPropertyValue.value
	})
})

addBlockResponseButton.addEventListener("click", () => {
	const val = {
		__value__ : addBlockResponseValue.value,
		value : addBlockResponseValue.value
	}
	mutateContext((ctx) => {
		ctx.flow[addBlockResponseLabel.value] = val
	})
})

const deletePropertiesButton = document.getElementById("delete-properties") as HTMLInputElement
const deleteResponsesButton = document.getElementById("delete-responses") as HTMLInputElement

deletePropertiesButton.addEventListener("click", () => {
	mutateContext((ctx) => {
		ctx.contact = {}
	})
})

deleteResponsesButton.addEventListener("click", () => {
	mutateContext((ctx) => {
		ctx.flow = {}
	})
})
