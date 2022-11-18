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
var LogRequest = /** @class */ (function (_super) {
    __extends(LogRequest, _super);
    function LogRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    LogRequest.prototype.load = function (data) {
        _super.prototype.load.call(this, data);
        // fallback to the ip field for backward compatability
        data.remoteIp = data.remoteIp || data.ip;
        this.url = typeof data.url === 'string' ? data.url : '';
        this.method = typeof data.method === 'string' ? data.method : 'GET';
        this.status = typeof data.status === 'number' ? data.status : 200;
        this.auth = typeof data.auth === 'string' ? data.auth : 'guest';
        this.remoteIp = typeof data.remoteIp === 'string' ? data.remoteIp : '';
        this.userIp = typeof data.userIp === 'string' ? data.userIp : '';
        this.referer = typeof data.referer === 'string' ? data.referer : '';
        this.userAgent = typeof data.userAgent === 'string' ? data.userAgent : '';
        this.meta = typeof data.meta === 'object' && data.meta !== null ? data.meta : {};
    };
    return LogRequest;
}(BaseModel));
export default LogRequest;
