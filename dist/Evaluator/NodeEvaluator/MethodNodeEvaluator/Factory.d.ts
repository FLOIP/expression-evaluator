import { MethodNodeHandler, MethodNodeEvaluator } from ".";
export default class MethodNodeEvaluatorFactory {
    static create(methodNodeHandlers?: Array<MethodNodeHandler>): MethodNodeEvaluator;
    static defaultHandlers(): Array<MethodNodeHandler>;
}
