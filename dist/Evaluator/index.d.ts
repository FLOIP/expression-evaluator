import { ParseFunction } from 'floip-parser/dist/Parser';
import { NodeEvaluator } from './NodeEvaluator';
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
    private evalNode;
    addNodeEvaluator(evaluator: NodeEvaluator): void;
    getNodeEvaluator(type: string): NodeEvaluator;
    private hasNodes;
}
