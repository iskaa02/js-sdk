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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * ClientResponseError is a custom Error class that is intended to wrap
 * and normalize any error thrown by `Client.send()`.
 */
var ClientResponseError = /** @class */ (function (_super) {
    __extends(ClientResponseError, _super);
    function ClientResponseError(errData) {
        var _this = this;
        var _a;
        _this = _super.call(this, "ClientResponseError") || this;
        _this.url = '';
        _this.status = 0;
        _this.data = {};
        _this.isAbort = false;
        _this.originalError = null;
        // Set the prototype explicitly.
        // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, ClientResponseError.prototype);
        if (!(errData instanceof ClientResponseError)) {
            _this.originalError = errData;
        }
        if (errData !== null && typeof errData === 'object') {
            _this.url = typeof errData.url === 'string' ? errData.url : '';
            _this.status = typeof errData.status === 'number' ? errData.status : 0;
            _this.data = errData.data !== null && typeof errData.data === 'object' ? errData.data : {};
        }
        if (typeof DOMException !== 'undefined' && errData instanceof DOMException) {
            _this.isAbort = true;
        }
        _this.name = "ClientResponseError " + _this.status;
        _this.message = (_a = _this.data) === null || _a === void 0 ? void 0 : _a.message;
        if (!_this.message) {
            _this.message = _this.isAbort ?
                'The request was autocancelled. More info you could find in https://github.com/pocketbase/js-sdk#auto-cancellation.' :
                'Something went wrong while processing your request.';
        }
        return _this;
    }
    // Make a POJO's copy of the current error class instance.
    // @see https://github.com/vuex-orm/vuex-orm/issues/255
    ClientResponseError.prototype.toJSON = function () {
        return __assign({}, this);
    };
    return ClientResponseError;
}(Error));
export default ClientResponseError;
