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
import BaseModel from '@/models/utils/BaseModel';
import SchemaField from '@/models/utils/SchemaField';
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    Collection.prototype.load = function (data) {
        _super.prototype.load.call(this, data);
        this.system = !!data.system;
        this.name = typeof data.name === 'string' ? data.name : '';
        this.type = typeof data.type === 'string' ? data.type : 'base';
        this.options = typeof data.options !== 'undefined' ? data.options : {};
        // rules
        this.listRule = typeof data.listRule === 'string' ? data.listRule : null;
        this.viewRule = typeof data.viewRule === 'string' ? data.viewRule : null;
        this.createRule = typeof data.createRule === 'string' ? data.createRule : null;
        this.updateRule = typeof data.updateRule === 'string' ? data.updateRule : null;
        this.deleteRule = typeof data.deleteRule === 'string' ? data.deleteRule : null;
        // schema
        data.schema = Array.isArray(data.schema) ? data.schema : [];
        this.schema = [];
        for (var _i = 0, _a = data.schema; _i < _a.length; _i++) {
            var field = _a[_i];
            this.schema.push(new SchemaField(field));
        }
    };
    Object.defineProperty(Collection.prototype, "isBase", {
        /**
         * Checks if the current model is "base" collection.
         */
        get: function () {
            return this.type === 'base';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "isAuth", {
        /**
         * Checks if the current model is "auth" collection.
         */
        get: function () {
            return this.type === 'auth';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Collection.prototype, "isSingle", {
        /**
         * Checks if the current model is "single" collection.
         */
        get: function () {
            return this.type === 'single';
        },
        enumerable: false,
        configurable: true
    });
    return Collection;
}(BaseModel));
export default Collection;
