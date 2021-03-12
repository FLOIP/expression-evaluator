import { ParseFunction } from '@floip/expression-parser';
import Node from './Node';
import { NodeEvaluator } from './NodeEvaluator';
import moment from 'moment';
import {EvaluatorError} from './Exception';

/**
 * The Evaluator evaluates flow expressions and context.
 * Expressions may be composed of many different node types as well as plain
 * strings. To deal with the different node types, the Evaluator delegates the
 * evaluation of each type to NodeEvaluators, which can be added to an Evaluator
 * instance.
 * The Evaluator's resonsibility is consuming an abstract syntax tree from the
 * flow expression parser, so that the evaluation of the tree can be delegated
 * to the specialized NodeEvaluators.
 */
export class Evaluator {
	private evaluators: Map<string, any> = new Map();

	constructor(private parse: ParseFunction) {
		//
	}

    /**
     * Evaluate a FLOIP expression.
     * Each expression object in the AST produced by the parser
     * will be transformed into a Node and evaluated with an assigned
     * NodeEvaluator. These NodeEvaluators are added to this Evaluator object
     * via addNodeEvaluator.
     *
     * @param expression Expression to evaluate
     * @param context The expression context, as an object or JSON 
     * @see Evaluator::addNodeEvaluator
     * @return The evaluated expression.
     */
	public evaluate(expression: string, context: object|string) : string {
		if (typeof context === 'string') {
			context = this.deserializeContextOrThrow(context)
		}
		// iterate through the expression context and convert all date strings
		// into moment date objects
		if (context['date'] !== undefined) {
			for(let [k, v] of Object.entries(context['date'])) {
				context['date'][k] = moment(String(v));
			}
		}

		// parse our AST and map anything that looks like a node to a node object
		const ast: [any] = this.parse(expression)
			.map(item => Node.isNode(item) ? new Node(item) : item);

		// we want to order the nodes depth-first
		// this is because nodes may contain other nodes as values, so in order
		// to evaluate parent nodes, their children must be evaluated first.
		const orderedNodes = this.sortNodesDepthFirst(ast.filter(item => item instanceof Node));

		// now evaluate all of the nodes in our depth-first array
		// since the nodes are object references, the originals in the ast
		// array will get the values.
		for (let node of orderedNodes) {
			node.value = this.getNodeEvaluator(node.type()).evaluate(node, context);
		}

		// all the nodes are evaluated, so we can join the parts of the
		// expression together.
		return ast.map(x => x.toString()).join('');
	}

	private deserializeContextOrThrow(context: string): object {
		try {
			const deserialized = JSON.parse(context)
			if (typeof deserialized === 'object') {
				return deserialized;
			}
		} catch (error) {
			if (error instanceof SyntaxError) {
				throw new EvaluatorError(`Syntax error when deserializing context: ${context}`)
			}
		}
		throw new EvaluatorError(`Could not deserialize context into object: ${context}`) 
	}

	private sortNodesDepthFirst(nodes : Array<Node>) : Array<Node> {
		const nodeStack : Array<Node> = [];

		while (nodes.length) {
			const node = nodes.shift();

			if (typeof node === 'undefined') {
				break;
			}

			// push the node to the stack
			nodeStack.unshift(node);

			// check the node for any child nodes
			for (let n in node.data) {
				const prop = node.data[n];
				// add child nodes to our list of children to evaluate
				if (Node.isNode(prop) || prop instanceof Node) {
					const child = new Node(prop);
					nodes.unshift(child)
					node.data[n] = child;
				} else if (this.hasNodes(prop)) {
					for (let i = 0; i < prop.length; ++i) {
						if (Node.isNode(prop[i])) {
							// replace the child node struct with a node object
							const child = new Node(prop[i]);
							prop[i] = child;
							// add that node to the stack
							nodes.unshift(child);
						}
					}
				}
			}
		}

		return nodeStack;
	}

	/**
     * @param evaluator The node evaluator to add
     * @see Contact\Expression for node types
     * @return This expression evaluator
     */
	public addNodeEvaluator(evaluator : NodeEvaluator) {
		this.evaluators.set(evaluator.handles(), evaluator);
	}

	/**
	 * @param type The type of the node evaluator to return
	 * @return The node evaluator associated with the passed type
	 * @throws Error when no evaluator was associated with the passed type
	 */
	public getNodeEvaluator(type : string) : NodeEvaluator {
		if (this.evaluators.has(type)) {
			return this.evaluators.get(type);
		}
		throw Error(`No evaluator for node type ${type} found`);
	}

	private hasNodes(collection: any) {
		return Array.isArray(collection)
			&& collection.find(x => Node.isNode(x) || x instanceof Node);
	}
}
