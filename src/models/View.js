var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import BaseModel from "@/models/utils/BaseModel";
import SchemaField from "@/models/utils/SchemaField";
var ViewService = /** @class */ (function (_super) {
    __extends(ViewService, _super);
    function ViewService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    ViewService.prototype.load = function (data) {
        _super.prototype.load.call(this, data);
        this.name = typeof data.name === "string" ? data.name : "";
        // rules
        this.listRule = typeof data.listRule === "string" ? data.listRule : null;
        // sql
        this.sql = typeof data.sql === "string" ? data.sql : "";
        // schema
        data.schema = Array.isArray(data.schema) ? data.schema : [];
        this.schema = [];
        for (var _i = 0, _a = data.schema; _i < _a.length; _i++) {
            var field = _a[_i];
            this.schema.push(new SchemaField(field));
        }
    };
    return ViewService;
}(BaseModel));
export default ViewService;
