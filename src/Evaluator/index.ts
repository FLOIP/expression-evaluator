// @ts-ignore
import { ParseFunction } from 'floip-parser/dist/Parser';
import Node from './Node';
import { NodeEvaluator } from './NodeEvaluator';

export class Evaluator {
	private evaluators: Map<string, any> = new Map();

	constructor(private parse: ParseFunction) {
	}

    /**
     * Evaluate a FLOIP expression.
     * Each expression object in the AST produced by the parser
     * will be transformed into a Node and evaluated with an assigned
     * NodeEvaluator. These NodeEvaluators are added to this Evaluator object
     * via addNodeEvaluator.
     *
     * @param expression Expression to evaluate
     * @param context The expression context
     * @see Evaluator::addNodeEvaluator
     * @return The evaluated expression.
     */
	public evaluate(expression: string, context: object) : string {
		let ast: [any] = this.parse(expression)
			.map(item => Node.isNode(item) ? new Node(item) : item);

		// we want to evaluate all nodes that are objects
		let nodes : Array<Node> = ast.filter(item => item instanceof Node);
		
		let orderedNodes : Array<Node> = [];

		while (nodes.length) {
			let node = nodes.shift();

			if (typeof node === 'undefined') {
				break;
			}

			// push the node to the stack
			orderedNodes.unshift(node);

			// check the node for any child nodes
			for (let n in node.data) {
				let prop = node.data[n];
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

		// now evaluate all of the nodes in our depth-first array
		// since the nodes are object references, the originals in the ast
		// array will get the values.
		for (let node of orderedNodes) {
			node.value = this.evalNode(node, context);
		}

		// all the nodes are evaluated, so we can join the parts of the
		// expression together.
		return ast.map(x => x.toString()).join('');
	}

	private evalNode(node : Node, context : object) : any {
		return this.getNodeEvaluator(node.type()).evaluate(node, context);
	}

	public addNodeEvaluator(evaluator : NodeEvaluator) {
		this.evaluators.set(evaluator.handles(), evaluator);
	}

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
