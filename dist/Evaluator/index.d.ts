import { ParseFunction } from 'floip-parser/';
import { NodeEvaluator } from './NodeEvaluator';
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
export declare class Evaluator {
    private parse;
    private evaluators;
    constructor(parse: ParseFunction);
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
    evaluate(expression: string, context: object): string;
    private sortNodesDepthFirst;
    /**
     * @param evaluator The node evaluator to add
     * @see Contact\Expression for node types
     * @return This expression evaluator
     */
    addNodeEvaluator(evaluator: NodeEvaluator): void;
    /**
     * @param type The type of the node evaluator to return
     * @return The node evaluator associated with the passed type
     * @throws Error when no evaluator was associated with the passed type
     */
    getNodeEvaluator(type: string): NodeEvaluator;
    private hasNodes;
}
