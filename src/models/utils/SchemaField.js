var SchemaField = /** @class */ (function () {
    function SchemaField(data) {
        if (data === void 0) { data = {}; }
        this.load(data || {});
    }
    /**
     * Loads `data` into the field.
     */
    SchemaField.prototype.load = function (data) {
        this.id = typeof data.id !== 'undefined' ? data.id : '';
        this.name = typeof data.name !== 'undefined' ? data.name : '';
        this.type = typeof data.type !== 'undefined' ? data.type : 'text';
        this.system = !!data.system;
        this.required = !!data.required;
        this.unique = !!data.unique;
        this.options = typeof data.options === 'object' && data.options !== null ? data.options : {};
    };
    return SchemaField;
}());
export default SchemaField;
