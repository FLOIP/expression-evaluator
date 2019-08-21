"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NodeEvaluatorError = /** @class */ (function (_super) {
    __extends(NodeEvaluatorError, _super);
    function NodeEvaluatorError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NodeEvaluatorError;
}(Error));
exports.NodeEvaluatorError = NodeEvaluatorError;
var NodeShapeError = /** @class */ (function (_super) {
    __extends(NodeShapeError, _super);
    function NodeShapeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NodeShapeError;
}(NodeEvaluatorError));
exports.NodeShapeError = NodeShapeError;
//# sourceMappingURL=Exception.js.map