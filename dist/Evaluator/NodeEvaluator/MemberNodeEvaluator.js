"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberNodeEvaluator = exports.MEMBER_TYPE = void 0;
var tslib_1 = require("tslib");
var __1 = require("../..");
var moment_1 = tslib_1.__importDefault(require("moment"));
exports.MEMBER_TYPE = 'MEMBER';
var MemberNodeEvaluator = /** @class */ (function () {
    function MemberNodeEvaluator() {
    }
    MemberNodeEvaluator.prototype.handles = function () {
        return exports.MEMBER_TYPE;
    };
    /**
     * Evaluate the value of a member access node given a context.
     *
     * @param node
     * @param context
     */
    MemberNodeEvaluator.prototype.evaluate = function (node, context) {
        var e_1, _a;
        var data = node.data;
        this.typeGuard(data);
        var keys = data.key.split('.');
        var currentContext = context;
        try {
            // traverse the context tree until we run out of keys
            for (var keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var currentKey = keys_1_1.value;
                if (currentKey in currentContext) {
                    currentContext = currentContext[currentKey];
                }
                else {
                    // if our current key doesn't exist, we return the compound key
                    return data.key;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /* at this point, we have a value associated with our key if it is a nested context, return its default value or JSON unless it
        is a Moment object which we return*/
        if (!Array.isArray(currentContext)
            && typeof currentContext === 'object'
            && currentContext !== null) {
            if ('__value__' in currentContext) {
                return currentContext['__value__'];
            }
            else if (moment_1.default.isMoment(currentContext)) {
                return currentContext;
            }
            else {
                return JSON.stringify(currentContext);
            }
        }
        else if (typeof currentContext === 'undefined') {
            // if we hit an undefined value, just return the compound key
            return data.key;
        }
        else {
            return currentContext;
        }
    };
    MemberNodeEvaluator.prototype.typeGuard = function (member) {
        if (!('key' in member)) {
            throw new __1.NodeShapeError('Member node is the wrong shape, should have "key"');
        }
    };
    return MemberNodeEvaluator;
}());
exports.MemberNodeEvaluator = MemberNodeEvaluator;
//# sourceMappingURL=MemberNodeEvaluator.js.map