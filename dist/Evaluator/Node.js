"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
    }
    /**
     * Check if an object looks like a node structure.
     * @param item Some item to check
     */
    Node.isNode = function (item) {
        return typeof item === 'object'
            && item !== null
            && item.hasOwnProperty('type');
    };
    /**
     * Return the type of this node.
     * @see Contract\Expression for node types.
     */
    Node.prototype.type = function () {
        return this.data.type;
    };
    Node.prototype.toString = function () {
        if (typeof this.value === 'undefined') {
            throw new Error('Expression node value not set');
        }
        if (typeof this.value === 'boolean') {
            return this.value ? 'TRUE' : 'FALSE';
        }
        if (this.value === null) {
            return 'NULL';
        }
        return this.value;
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=Node.js.map