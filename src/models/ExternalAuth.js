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
var ExternalAuth = /** @class */ (function (_super) {
    __extends(ExternalAuth, _super);
    function ExternalAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    ExternalAuth.prototype.load = function (data) {
        _super.prototype.load.call(this, data);
        this.recordId = typeof data.recordId === 'string' ? data.recordId : '';
        this.collectionId = typeof data.collectionId === 'string' ? data.collectionId : '';
        this.provider = typeof data.provider === 'string' ? data.provider : '';
        this.providerId = typeof data.providerId === 'string' ? data.providerId : '';
    };
    return ExternalAuth;
}(BaseModel));
export default ExternalAuth;
