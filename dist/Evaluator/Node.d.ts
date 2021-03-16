import {Expression} from "../";

export declare class Node {
    data: Expression;
    value: any;
    constructor(data: object);
    /**
     * Check if an object looks like a node structure.
     * @param item Some item to check
     */
    static isNode(item: any): boolean;
    /**
     * Return the type of this node.
     * @see Contract\Expression for node types.
     */
    type(): string;
    toString(): string;
}
//# sourceMappingURL=Node.d.ts.map
