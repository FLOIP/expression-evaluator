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
        // the requested object does not exist in the context, so just
        // return the key/value that was requested as they were entered in
        // the expression (e.g. return 'contact.name')
        if (!(data.key in context)) {
            if (data.value) {
                return data.key + "." + data.value;
            }
            return data.key;
        }
        var element = context[data.key];
        if (typeof data.value === 'undefined' || data.value === null) {
            // return the __value__ element of the context, or else the whole
            // context serialized
            if ('__value__' in element) {
                return element.__value__;
            }
            return JSON.stringify(element);
        }
        return this.get(element, data.value);
    };
    MemberNodeEvaluator.prototype.typeGuard = function (member) {
        if (!('key' in member)) {
            throw new Exception_1.NodeShapeError('Member node is the wrong shape, should have "key"');
        }
    };
    MemberNodeEvaluator.prototype.get = function (context, key) {
        var keys = key.split('.');
        var currentContext = context;
        // traverse the context tree until we run out of keys
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var currentKey = keys_1[_i];
            if (currentKey in currentContext) {
                currentContext = currentContext[currentKey];
            }
            else {
                // if our current key doesn't exist, we return the compound key
                return key;
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
        return currentContext;
    };
    return MemberNodeEvaluator;
}());
exports.default = MemberNodeEvaluator;
//# sourceMappingURL=MemberNodeEvaluator.js.map