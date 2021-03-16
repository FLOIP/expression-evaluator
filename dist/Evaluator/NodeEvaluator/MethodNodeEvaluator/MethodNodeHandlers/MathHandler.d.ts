import {AbstractNodeHandler, Node} from "../../../..";

export declare class MathHandler extends AbstractNodeHandler {
    handles(): string[];
    abs(number: number | Node): number;
    max(...args: [number | Node]): number;
    min(...args: [number | Node]): number;
    power(number: number | Node, power: number | Node): number;
    sum(...args: [number | Node]): number;
    protected value(item: any): number;
}
//# sourceMappingURL=MathHandler.d.ts.map
