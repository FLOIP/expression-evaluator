import {Node, NodeEvaluator} from "../..";
import moment from 'moment';

export declare const MATH_TYPE = "MATH";
export declare class MathNodeEvaluator implements NodeEvaluator {
    evaluate(node: Node, _context: object): any;
    private evaluateDateMath;
    handles(): string;
    value(item: unknown): any;
    parseDateTime(dateTimeString: string): moment.Moment | boolean | moment.Duration;
    private typeGuard;
}
//# sourceMappingURL=MathNodeEvaluator.d.ts.map
