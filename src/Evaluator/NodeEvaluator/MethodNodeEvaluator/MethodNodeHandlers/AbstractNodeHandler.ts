import { MethodNodeHandler } from "../..";
import Node from "../../../Node";

export default abstract class AbstracetNodeHandler implements MethodNodeHandler {
	abstract handles() : string[];
	
	protected value(item : any) : any {
		return (item instanceof Node) ? item.value : item;
	}
}
