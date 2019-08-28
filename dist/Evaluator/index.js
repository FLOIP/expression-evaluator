"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __importDefault(require("./Node"));
var Evaluator = /** @class */ (function () {
    function Evaluator(parse) {
        this.parse = parse;
        this.evaluators = new Map();
    }
    /**
     * Evaluate a FLOIP expression.
     * Each expression object in the AST produced by the parser
     * will be transformed into a Node and evaluated with an assigned
     * NodeEvaluator. These NodeEvaluators are added to this Evaluator object
     * via addNodeEvaluator.
     *
     * @param expression Expression to evaluate
     * @param context The expression context
     * @see Evaluator::addNodeEvaluator
     * @return The evaluated expression.
     */
    Evaluator.prototype.evaluate = function (expression, context) {
        var ast = this.parse(expression)
            .map(function (item) { return Node_1.default.isNode(item) ? new Node_1.default(item) : item; });
        // we want to evaluate all nodes that are objects
        var nodes = ast.filter(function (item) { return item instanceof Node_1.default; });
        var orderedNodes = [];
        while (nodes.length) {
            var node = nodes.shift();
            if (typeof node === 'undefined') {
                break;
            }
            // push the node to the stack
            orderedNodes.unshift(node);
            // check the node for any child nodes
            for (var n in node.data) {
                var prop = node.data[n];
                // add child nodes to our list of children to evaluate
                if (Node_1.default.isNode(prop) || prop instanceof Node_1.default) {
                    var child = new Node_1.default(prop);
                    nodes.unshift(child);
                    node.data[n] = child;
                }
                else if (this.hasNodes(prop)) {
                    for (var i = 0; i < prop.length; ++i) {
                        if (Node_1.default.isNode(prop[i])) {
                            // replace the child node struct with a node object
                            var child = new Node_1.default(prop[i]);
                            prop[i] = child;
                            // add that node to the stack
                            nodes.unshift(child);
                        }
                    }
                }
            }
        }
        // now evaluate all of the nodes in our depth-first array
        // since the nodes are object references, the originals in the ast
        // array will get the values.
        for (var _i = 0, orderedNodes_1 = orderedNodes; _i < orderedNodes_1.length; _i++) {
            var node = orderedNodes_1[_i];
            node.value = this.evalNode(node, context);
        }
        // all the nodes are evaluated, so we can join the parts of the
        // expression together.
        return ast.map(function (x) { return x.toString(); }).join('');
    };
    Evaluator.prototype.evalNode = function (node, context) {
        return this.getNodeEvaluator(node.type()).evaluate(node, context);
    };
    Evaluator.prototype.addNodeEvaluator = function (evaluator) {
        this.evaluators.set(evaluator.handles(), evaluator);
    };
    Evaluator.prototype.getNodeEvaluator = function (type) {
        if (this.evaluators.has(type)) {
            return this.evaluators.get(type);
        }
        throw Error("No evaluator for node type " + type + " found");
    };
    Evaluator.prototype.hasNodes = function (collection) {
        return Array.isArray(collection)
            && collection.find(function (x) { return Node_1.default.isNode(x) || x instanceof Node_1.default; });
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
//# sourceMappingURL=index.js.map