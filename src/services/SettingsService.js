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
import BaseService from '@/services/utils/BaseService';
var SettingsService = /** @class */ (function (_super) {
    __extends(SettingsService, _super);
    function SettingsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch all available app settings.
     */
    SettingsService.prototype.getAll = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send('/api/settings', {
            'method': 'GET',
            'params': queryParams,
        }).then(function (responseData) { return responseData || {}; });
    };
    /**
     * Bulk updates app settings.
     */
    SettingsService.prototype.update = function (bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send('/api/settings', {
            'method': 'PATCH',
            'params': queryParams,
            'body': bodyParams,
        }).then(function (responseData) { return responseData || {}; });
    };
    /**
     * Performs a S3 storage connection test.
     */
    SettingsService.prototype.testS3 = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send('/api/settings/test/s3', {
            'method': 'POST',
            'params': queryParams,
        }).then(function () { return true; });
    };
    /**
     * Sends a test email.
     *
     * The possible `emailTemplate` values are:
     * - verification
     * - password-reset
     * - email-change
     */
    SettingsService.prototype.testEmail = function (toEmail, emailTemplate, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        var bodyParams = {
            'email': toEmail,
            'template': emailTemplate,
        };
        return this.client.send('/api/settings/test/email', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    return SettingsService;
}(BaseService));
export default SettingsService;
