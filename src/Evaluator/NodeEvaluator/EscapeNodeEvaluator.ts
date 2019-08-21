import { NodeEvaluator } from ".";
import { ESCAPE_TYPE, IDENTIFIER } from "../../Contract/Expression";

export default class EscapeNodeEvaluator implements NodeEvaluator {
	evaluate(node: import("../Node").default, context: object) {
		return IDENTIFIER;
	}
	handles(): string {
		return ESCAPE_TYPE;
	}
}
