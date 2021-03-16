"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFactory = void 0;
// noinspection JSUnusedGlobalSymbols
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
            case 'NULL':
                return data;
            case 'CONCATENATE':
                return data;
            default:
                throw new Error('Node data not formatted correctly');
        }
    };
    return ExpressionFactory;
}());
exports.ExpressionFactory = ExpressionFactory;
//# sourceMappingURL=ExpressionFactory.js.map