"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionFactory = /** @class */ (function () {
    function ExpressionFactory() {
    }
    ExpressionFactory.instance = function (data) {
        switch (data.type.toUpperCase()) {
            case 'METHOD':
                return data;
            case 'MEMBER':
                return data;
            case 'MATH':
                return data;
            case 'LOGIC':
                return data;
            case 'ESCAPE':
                return data;
            case 'CONCATENATE':
                return data;
        }
        throw new Error('Node data not formatted correctly');
    };
    return ExpressionFactory;
}());
exports.ExpressionFactory = ExpressionFactory;
exports.METHOD_TYPE = 'METHOD';
exports.MEMBER_TYPE = 'MEMBER';
exports.MATH_TYPE = 'MATH';
exports.LOGIC_TYPE = 'LOGIC';
exports.ESCAPE_TYPE = 'ESCAPE';
exports.CONCATENATE_TYPE = 'CONCATENATE';
exports.IDENTIFIER = '@';
//# sourceMappingURL=Expression.js.map