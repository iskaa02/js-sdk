var ViewRecord = /** @class */ (function () {
    function ViewRecord(data) {
        if (data === void 0) { data = {}; }
        this.load(data || {});
    }
    /**
     * @inheritdoc
     */
    ViewRecord.prototype.load = function (data) {
        for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            this[key] = value;
        }
    };
    ViewRecord.prototype.clone = function () {
        return new this.constructor(JSON.parse(JSON.stringify(this)));
    };
    /**
     * Exports all model properties as a new plain object.
     */
    ViewRecord.prototype.export = function () {
        return Object.assign({}, this);
    };
    return ViewRecord;
}());
export default ViewRecord;
