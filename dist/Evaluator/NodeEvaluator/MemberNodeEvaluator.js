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
        var keys = data.key.split('.');
        var currentContext = context;
        // traverse the context tree until we run out of keys
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var currentKey = keys_1[_i];
            if (currentKey in currentContext) {
                currentContext = currentContext[currentKey];
            }
            else {
                // if our current key doesn't exist, we return the compound key
                return data.key;
            }
        }
        // at this point, we have a value associated with our key
        // if it is a nested context, return its default value or JSON
        if (!Array.isArray(currentContext)
            && typeof currentContext === 'object'
            && currentContext !== null) {
            if ('__value__' in currentContext) {
                return currentContext['__value__'];
            }
            return JSON.stringify(currentContext);
        }
        // if we hit an undefined value, just return the compound key
        if (typeof currentContext === 'undefined') {
            return data.key;
        }
        return currentContext;
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