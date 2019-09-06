import { NodeEvaluator } from ".";
import Node from "../Node";
import moment from 'moment';
export default class MathNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, context: object): number | moment.Moment | undefined;
    private evaluateDateMath;
    handles(): string;
    private value;
    private typeGuard;
}
