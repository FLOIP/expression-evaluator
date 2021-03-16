import {AbstractNodeHandler, Node} from "../../../..";

export declare class ArrayHandler extends AbstractNodeHandler {
    handles(): string[];
    array(...args: any[]): any[];
    in(value: any, array: Node | any[]): boolean;
    count(array: Node | any[]): number;
}
//# sourceMappingURL=ArrayHandler.d.ts.map
