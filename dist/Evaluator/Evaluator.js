"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
var tslib_1 = require("tslib");
var moment_1 = tslib_1.__importDefault(require("moment"));
var __1 = require("..");
/**
 * The Evaluator evaluates flow expressions and context.
 * Expressions may be composed of many different node types as well as plain
 * strings. To deal with the different node types, the Evaluator delegates the
 * evaluation of each type to NodeEvaluators, which can be added to an Evaluator
 * instance.
 * The Evaluator's resonsibility is consuming an abstract syntax tree from the
 * flow expression parser, so that the evaluation of the tree can be delegated
 * to the specialized NodeEvaluators.
 */
var Evaluator = /** @class */ (function () {
    function Evaluator(parse) {
        this.parse = parse;
        this.evaluators = {};
    }
    /**
     * Evaluate a FLOIP expression.
     * Each expression object in the AST produced by the parser
     * will be transformed into a Node and evaluated with an assigned
     * NodeEvaluator. These NodeEvaluators are added to this Evaluator object
     * via addNodeEvaluator.
     *
     * @param expression Expression to evaluate
     * @param context The expression context, as an object or JSON
     * @see Evaluator::addNodeEvaluator
     * @return The evaluated expression.
     */
    Evaluator.prototype.evaluate = function (expression, context) {
        var e_1, _a, e_2, _b;
        if (typeof context === 'string') {
            context = this.deserializeContextOrThrow(context);
        }
        // iterate through the expression context and convert all date strings into moment date objects
        if (context['date'] !== undefined) {
            try {
                for (var _c = tslib_1.__values(Object.entries(context['date'])), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = tslib_1.__read(_d.value, 2), k = _e[0], v = _e[1];
                    context['date'][k] = moment_1.default(String(v));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        // parse our AST and map anything that looks like a node to a node object
        var ast = this.parse(expression).map(function (item) {
            if (__1.Node.isNode(item)) {
                return new __1.Node(item);
            }
            else {
                return item;
            }
        });
        var orderedNodes = this.sortNodesDepthFirst(ast.filter(function (item) { return item instanceof __1.Node; }));
        try {
            /* now evaluate all of the nodes in our depth-first array since the nodes are object references, the originals in the ast array will
               get the values.*/
            for (var orderedNodes_1 = tslib_1.__values(orderedNodes), orderedNodes_1_1 = orderedNodes_1.next(); !orderedNodes_1_1.done; orderedNodes_1_1 = orderedNodes_1.next()) {
                var node = orderedNodes_1_1.value;
                var nodeEvaluator = this.getNodeEvaluator(node.type());
                node.value = nodeEvaluator.evaluate(node, context);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (orderedNodes_1_1 && !orderedNodes_1_1.done && (_b = orderedNodes_1.return)) _b.call(orderedNodes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // all the nodes are evaluated, so we can join the parts of the
        // expression together.
        return ast.map(function (x) { return x.toString(); }).join('');
    };
    Evaluator.prototype.deserializeContextOrThrow = function (context) {
        try {
            var deserialized = JSON.parse(context);
            if (typeof deserialized === 'object') {
                return deserialized;
            }
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                throw new __1.EvaluatorError("Syntax error when deserializing context: " + context);
            }
        }
        throw new __1.EvaluatorError("Could not deserialize context into object: " + context);
    };
    /**
     * We want to order the nodes depth-first this is because nodes may contain other nodes as values, so in order to evaluate parent
     * nodes, their children must be evaluated first.
     **/
    Evaluator.prototype.sortNodesDepthFirst = function (nodes) {
        var nodeStack = [];
        while (nodes.length) {
            var node = nodes.shift();
            if (typeof node === 'undefined') {
                break;
            }
            // push the node to the stack
            nodeStack.unshift(node);
            // check the node for any child nodes
            for (var nodeData in node.data) {
                var prop = node.data[nodeData];
                // add child nodes to our list of children to evaluate
                if (__1.Node.isNode(prop) || prop instanceof __1.Node) {
                    var child = new __1.Node(prop);
                    nodes.unshift(child);
                    node.data[nodeData] = child;
                }
                else if (this.hasNodes(prop)) {
                    for (var i = 0; i < prop.length; ++i) {
                        if (__1.Node.isNode(prop[i])) {
                            // replace the child node struct with a node object
                            var child = new __1.Node(prop[i]);
                            prop[i] = child;
                            // add that node to the stack
                            nodes.unshift(child);
                        }
                    }
                }
            }
        }
        return nodeStack;
    };
    /**
     * @param evaluator The node evaluator to add
     * @see Contact\Expression for node types
     * @return This expression evaluator
     */
    Evaluator.prototype.addNodeEvaluator = function (evaluator) {
        this.evaluators[evaluator.handles()] = evaluator;
    };
    /**
     * @param type The type of the node evaluator to return
     * @return The node evaluator associated with the passed type
     * @throws Error when no evaluator was associated with the passed type
     */
    Evaluator.prototype.getNodeEvaluator = function (type) {
        if (type in this.evaluators) {
            return this.evaluators[type];
        }
        else {
            throw Error("No evaluator for node type " + type + " found");
        }
    };
    Evaluator.prototype.hasNodes = function (collection) {
        return Array.isArray(collection) && collection.some(function (x) { return __1.Node.isNode(x) || x instanceof __1.Node; });
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
//# sourceMappingURL=Evaluator.js.map