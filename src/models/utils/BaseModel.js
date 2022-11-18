var BaseModel = /** @class */ (function () {
    function BaseModel(data) {
        if (data === void 0) { data = {}; }
        this.load(data || {});
    }
    /**
     * Loads `data` into the current model.
     */
    BaseModel.prototype.load = function (data) {
        for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this[key] = value;
        }
        // normalize known fields
        this.id = typeof data.id !== 'undefined' ? data.id : '';
        this.created = typeof data.created !== 'undefined' ? data.created : '';
        this.updated = typeof data.updated !== 'undefined' ? data.updated : '';
    };
    Object.defineProperty(BaseModel.prototype, "isNew", {
        /**
         * Returns whether the current loaded data represent a stored db record.
         */
        get: function () {
            return !this.id;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Creates a seep clone of the current model.
     */
    BaseModel.prototype.clone = function () {
        return new this.constructor(JSON.parse(JSON.stringify(this)));
    };
    /**
     * Exports all model properties as a new plain object.
     */
    BaseModel.prototype.export = function () {
        return Object.assign({}, this);
    };
    return BaseModel;
}());
export default BaseModel;
