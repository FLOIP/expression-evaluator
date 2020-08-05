import Node from "../../../Node";
import AbstractNodeHandler from "./AbstractNodeHandler";
export default class ArrayHandler extends AbstractNodeHandler {
    handles(): string[];
    array(...args: any[]): any[];
    in(value: any, array: Node | any[]): boolean;
    count(array: Node | any[]): number;
}
