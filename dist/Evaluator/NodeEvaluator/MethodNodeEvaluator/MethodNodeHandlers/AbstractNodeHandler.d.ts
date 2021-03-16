import {MethodNodeHandler} from "../../../../index";

export declare abstract class AbstractNodeHandler implements MethodNodeHandler {
    abstract handles(): string[];
    protected value(item: any): any;
    protected isScalar(item: any): boolean;
}
//# sourceMappingURL=AbstractNodeHandler.d.ts.map
