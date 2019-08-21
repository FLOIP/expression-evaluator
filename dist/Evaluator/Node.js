"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
    }
    Node.isNode = function (item) {
        return typeof item === 'object'
            && item !== null
            && item.hasOwnProperty('type');
    };
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
        return this.value;
    };
    return Node;
}());
exports.default = Node;
//# sourceMappingURL=Node.js.map