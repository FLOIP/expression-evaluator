import { NodeEvaluator } from ".";
import Node from "../Node";
import moment from 'moment';
export default class MathNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, context: object): number | moment.Moment | undefined;
    private evaluateDateMath;
    handles(): string;
    value(item: any): number | moment.Moment | moment.Duration;
    parseDateTime(thing: any): false | moment.Moment | moment.Duration;
    private typeGuard;
}
