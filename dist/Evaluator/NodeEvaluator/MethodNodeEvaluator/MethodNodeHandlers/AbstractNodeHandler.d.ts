import { MethodNodeHandler } from "../";
export default abstract class AbstractNodeHandler implements MethodNodeHandler {
    abstract handles(): string[];
    protected value(item: any): any;
    protected isScalar(item: any): boolean;
}
