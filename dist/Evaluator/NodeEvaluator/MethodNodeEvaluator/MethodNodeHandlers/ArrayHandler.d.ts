import AbstractNodeHandler from "./AbstractNodeHandler";
import Node from "../../../Node";
export default class ArrayHandler extends AbstractNodeHandler {
    handles(): string[];
    array(...args: any[]): any[];
    in(value: any, array: Node | any[]): boolean;
}
