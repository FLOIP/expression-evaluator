import { Expression } from "../Contract/Expression";
export default class Node {
    data: Expression;
    value: any;
    constructor(data: object);
    static isNode(item: any): any;
    type(): string;
    toString(): string;
}
