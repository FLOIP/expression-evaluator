import {
  ArrayHandler,
  DateTimeHandler,
  ExcellentHandler,
  LogicalHandler,
  MathHandler,
  MethodNodeEvaluator,
  MethodNodeHandler,
  TextHandler,
} from "../../../index"

export class MethodNodeEvaluatorFactory {
  public static create(methodNodeHandlers: Array<MethodNodeHandler> = []): MethodNodeEvaluator {
    const evaluator = new MethodNodeEvaluator

    MethodNodeEvaluatorFactory
      .defaultHandlers()
      .concat(methodNodeHandlers)
      .forEach(item => evaluator.addHandler(item))

    return evaluator
  }

  public static defaultHandlers(): Array<MethodNodeHandler> {
    return [
      new DateTimeHandler(),
      new ExcellentHandler(),
      new LogicalHandler(),
      new MathHandler(),
      new TextHandler(),
      new ArrayHandler()
    ]
  }
}
