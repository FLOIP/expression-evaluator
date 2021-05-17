import {parse} from '@floip/expression-parser'
import {
  ConcatenateNodeEvaluator,
  EscapeNodeEvaluator,
  Evaluator,
  LogicNodeEvaluator,
  MathNodeEvaluator,
  MemberNodeEvaluator,
  MethodNodeEvaluatorFactory,
  NodeEvaluator,
  NullNodeEvaluator,
  BoolNodeEvaluator
} from ".."

// noinspection JSUnusedGlobalSymbols
export class EvaluatorFactory {
  public static create(nodeEvaluators: Array<NodeEvaluator> = []): Evaluator {
    const evaluator = new Evaluator(parse)

    EvaluatorFactory
      .defaultEvaluators()
      .concat(nodeEvaluators)
      .forEach(item => evaluator.addNodeEvaluator(item))

    return evaluator
  }

  public static defaultEvaluators(): Array<NodeEvaluator> {
    return [
      new MemberNodeEvaluator,
      MethodNodeEvaluatorFactory.create(),
      new LogicNodeEvaluator,
      new MathNodeEvaluator,
      new EscapeNodeEvaluator,
      new ConcatenateNodeEvaluator,
      new NullNodeEvaluator,
      new BoolNodeEvaluator,
    ]
  }
}
