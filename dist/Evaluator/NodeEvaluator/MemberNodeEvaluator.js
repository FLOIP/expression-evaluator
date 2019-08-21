"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../../Contract/Expression");
var Exception_1 = require("./Exception");
var MemberNodeEvaluator = /** @class */ (function () {
    function MemberNodeEvaluator() {
    }
    MemberNodeEvaluator.prototype.handles = function () {
        return Expression_1.MEMBER_TYPE;
    };
    /**
     * Evaluate the value of a member access node given a context.
     *
     * @param node
     * @param context
     */
    MemberNodeEvaluator.prototype.evaluate = function (node, context) {
        var data = node.data;
        this.typeGuard(data);
        if (!(data.key in context)) {
            if (data.value) {
                return data.key + "." + data.value;
            }
            return data.key;
        }
        var element = context[data.key];
        if (typeof data.value === 'undefined') {
            // return the __value__ element of the context, or else the whole
            // context serialized
            if ('__value__' in element) {
                return element.__value__;
            }
            return JSON.stringify(element);
        }
        return element[data.value];
    };
    MemberNodeEvaluator.prototype.typeGuard = function (member) {
        if (!('key' in member)) {
            throw new Exception_1.NodeShapeError('Member node is the wrong shape, should have "key"');
        }
    };
    return MemberNodeEvaluator;
}());
exports.default = MemberNodeEvaluator;
//# sourceMappingURL=MemberNodeEvaluator.js.map