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
import CrudService from '@/services/utils/CrudService';
import Admin from '@/models/Admin';
var AdminService = /** @class */ (function (_super) {
    __extends(AdminService, _super);
    function AdminService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    AdminService.prototype.decode = function (data) {
        return new Admin(data);
    };
    Object.defineProperty(AdminService.prototype, "baseCrudPath", {
        /**
         * @inheritdoc
         */
        get: function () {
            return '/api/admins';
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------
    // Post update/delete AuthStore sync
    // ---------------------------------------------------------------
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the updated id, then
     * on success the `client.authStore.model` will be updated with the result.
     */
    AdminService.prototype.update = function (id, bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return _super.prototype.update.call(this, id, bodyParams, queryParams).then(function (item) {
            var _a, _b;
            // update the store state if the updated item id matches with the stored model
            if (_this.client.authStore.model &&
                typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined' && // is not record auth
                ((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.id) === (item === null || item === void 0 ? void 0 : item.id)) {
                _this.client.authStore.save(_this.client.authStore.token, item);
            }
            return item;
        });
    };
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the deleted id,
     * then on success the `client.authStore` will be cleared.
     */
    AdminService.prototype.delete = function (id, queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return _super.prototype.delete.call(this, id, queryParams).then(function (success) {
            var _a, _b;
            // clear the store state if the deleted item id matches with the stored model
            if (success &&
                _this.client.authStore.model &&
                typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined' && // is not record auth
                ((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.id) === id) {
                _this.client.authStore.clear();
            }
            return success;
        });
    };
    // ---------------------------------------------------------------
    // Auth handlers
    // ---------------------------------------------------------------
    /**
     * Prepare successful authorize response.
     */
    AdminService.prototype.authResponse = function (responseData) {
        var admin = this.decode((responseData === null || responseData === void 0 ? void 0 : responseData.admin) || {});
        if ((responseData === null || responseData === void 0 ? void 0 : responseData.token) && (responseData === null || responseData === void 0 ? void 0 : responseData.admin)) {
            this.client.authStore.save(responseData.token, admin);
        }
        return Object.assign({}, responseData, {
            // normalize common fields
            'token': (responseData === null || responseData === void 0 ? void 0 : responseData.token) || '',
            'admin': admin,
        });
    };
    /**
     * Authenticate an admin account with its email and password
     * and returns a new admin token and data.
     *
     * On success this method automatically updates the client's AuthStore data.
     */
    AdminService.prototype.authWithPassword = function (email, password, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'identity': email,
            'password': password,
        }, bodyParams);
        return this.client.send(this.baseCrudPath + '/auth-with-password', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
            'headers': {
                'Authorization': '',
            },
        }).then(this.authResponse.bind(this));
    };
    /**
     * Refreshes the current admin authenticated instance and
     * returns a new token and admin data.
     *
     * On success this method automatically updates the client's AuthStore data.
     */
    AdminService.prototype.authRefresh = function (bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(this.baseCrudPath + '/auth-refresh', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(this.authResponse.bind(this));
    };
    /**
     * Sends admin password reset request.
     */
    AdminService.prototype.requestPasswordReset = function (email, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'email': email,
        }, bodyParams);
        return this.client.send(this.baseCrudPath + '/request-password-reset', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Confirms admin password reset request.
     */
    AdminService.prototype.confirmPasswordReset = function (passwordResetToken, password, passwordConfirm, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'token': passwordResetToken,
            'password': password,
            'passwordConfirm': passwordConfirm,
        }, bodyParams);
        return this.client.send(this.baseCrudPath + '/confirm-password-reset', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    return AdminService;
}(CrudService));
export default AdminService;
