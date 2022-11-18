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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import CrudService from '@/services/utils/CrudService';
import Record from '@/models/Record';
import ExternalAuth from '@/models/ExternalAuth';
var RecordService = /** @class */ (function (_super) {
    __extends(RecordService, _super);
    function RecordService(client, collectionIdOrName) {
        var _this = _super.call(this, client) || this;
        _this.collectionIdOrName = collectionIdOrName;
        return _this;
    }
    /**
     * @inheritdoc
     */
    RecordService.prototype.decode = function (data) {
        return new Record(data);
    };
    Object.defineProperty(RecordService.prototype, "baseCrudPath", {
        /**
         * @inheritdoc
         */
        get: function () {
            return this.baseCollectionPath + '/records';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecordService.prototype, "baseCollectionPath", {
        /**
         * Returns the current collection service base path.
         */
        get: function () {
            return '/api/collections/' + encodeURIComponent(this.collectionIdOrName);
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------
    // Realtime handlers
    // ---------------------------------------------------------------
    /**
     * @deprecated Use subscribe(recordId, callback) instead.
     *
     * Subscribe to the realtime changes of a single record in the collection.
     */
    RecordService.prototype.subscribeOne = function (recordId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.warn("PocketBase: subscribeOne(recordId, callback) is deprecated. Please replace it with subsribe(recordId, callback).");
                return [2 /*return*/, this.client.realtime.subscribe(this.collectionIdOrName + "/" + recordId, callback)];
            });
        });
    };
    RecordService.prototype.subscribe = function (topicOrCallback, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var topic;
            return __generator(this, function (_a) {
                if (typeof topicOrCallback === 'function') {
                    console.warn("PocketBase: subscribe(callback) is deprecated. Please replace it with subsribe('*', callback).");
                    return [2 /*return*/, this.client.realtime.subscribe(this.collectionIdOrName, topicOrCallback)];
                }
                if (!callback) {
                    throw new Error("Missing subscription callback.");
                }
                if (topicOrCallback === "") {
                    throw new Error("Missing topic.");
                }
                topic = this.collectionIdOrName;
                if (topicOrCallback !== "*") {
                    topic += ('/' + topicOrCallback);
                }
                return [2 /*return*/, this.client.realtime.subscribe(topic, callback)];
            });
        });
    };
    /**
     * Unsubscribe from all subscriptions of the specified topic
     * ("*" or record id).
     *
     * If `topic` is not set, then this method will unsubscribe from
     * all subscriptions associated to the current collection.
     */
    RecordService.prototype.unsubscribe = function (topic) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // unsubscribe wildcard topic
                if (topic === "*") {
                    return [2 /*return*/, this.client.realtime.unsubscribe(this.collectionIdOrName)];
                }
                // unsubscribe recordId topic
                if (topic) {
                    return [2 /*return*/, this.client.realtime.unsubscribe(this.collectionIdOrName + "/" + topic)];
                }
                // unsubscribe from everything related to the collection
                return [2 /*return*/, this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName)];
            });
        });
    };
    // ---------------------------------------------------------------
    // Post update/delete AuthStore sync
    // ---------------------------------------------------------------
    /**
     * @inheritdoc
     *
     * If the current `client.authStore.model` matches with the updated id, then
     * on success the `client.authStore.model` will be updated with the result.
     */
    RecordService.prototype.update = function (id, bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return _super.prototype.update.call(this, id, bodyParams, queryParams).then(function (item) {
            var _a, _b;
            if (typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) !== 'undefined' && // is record auth
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
    RecordService.prototype.delete = function (id, queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return _super.prototype.delete.call(this, id, queryParams).then(function (success) {
            var _a, _b;
            if (success &&
                typeof ((_a = _this.client.authStore.model) === null || _a === void 0 ? void 0 : _a.collectionId) !== 'undefined' && // is record auth
                ((_b = _this.client.authStore.model) === null || _b === void 0 ? void 0 : _b.id) === id) {
                _this.client.authStore.clear();
            }
            return success;
        });
    };
    // ---------------------------------------------------------------
    // Auth collection handlers
    // ---------------------------------------------------------------
    /**
     * Prepare successful collection authorization response.
     */
    RecordService.prototype.authResponse = function (responseData) {
        var record = this.decode((responseData === null || responseData === void 0 ? void 0 : responseData.record) || {});
        this.client.authStore.save(responseData === null || responseData === void 0 ? void 0 : responseData.token, record);
        return Object.assign({}, responseData, {
            // normalize common fields
            'token': (responseData === null || responseData === void 0 ? void 0 : responseData.token) || '',
            'record': record,
        });
    };
    /**
     * Returns all available collection auth methods.
     */
    RecordService.prototype.listAuthMethods = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(this.baseCollectionPath + '/auth-methods', {
            'method': 'GET',
            'params': queryParams,
        }).then(function (responseData) {
            return Object.assign({}, responseData, {
                // normalize common fields
                'usernamePassword': !!(responseData === null || responseData === void 0 ? void 0 : responseData.usernamePassword),
                'emailPassword': !!(responseData === null || responseData === void 0 ? void 0 : responseData.emailPassword),
                'authProviders': Array.isArray(responseData === null || responseData === void 0 ? void 0 : responseData.authProviders) ? responseData === null || responseData === void 0 ? void 0 : responseData.authProviders : [],
            });
        });
    };
    /**
     * Authenticate a single auth collection record via its username/email and password.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     */
    RecordService.prototype.authWithPassword = function (usernameOrEmail, password, bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'identity': usernameOrEmail,
            'password': password,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/auth-with-password', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
            'headers': {
                'Authorization': '',
            },
        }).then(function (data) { return _this.authResponse(data); });
    };
    /**
     * Authenticate a single auth collection record with OAuth2.
     *
     * On success, this method also automatically updates
     * the client's AuthStore data and returns:
     * - the authentication token
     * - the authenticated record model
     * - the OAuth2 account data (eg. name, email, avatar, etc.)
     */
    RecordService.prototype.authWithOAuth2 = function (provider, code, codeVerifier, redirectUrl, createData, bodyParams, queryParams) {
        var _this = this;
        if (createData === void 0) { createData = {}; }
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'provider': provider,
            'code': code,
            'codeVerifier': codeVerifier,
            'redirectUrl': redirectUrl,
            'createData': createData,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/auth-with-oauth2', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function (data) { return _this.authResponse(data); });
    };
    /**
     * Refreshes the current authenticated record instance and
     * returns a new token and record data.
     *
     * On success this method also automatically updates the client's AuthStore.
     */
    RecordService.prototype.authRefresh = function (bodyParams, queryParams) {
        var _this = this;
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(this.baseCollectionPath + '/auth-refresh', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function (data) { return _this.authResponse(data); });
    };
    /**
     * Sends auth record password reset request.
     */
    RecordService.prototype.requestPasswordReset = function (email, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'email': email,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/request-password-reset', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Confirms auth record password reset request.
     */
    RecordService.prototype.confirmPasswordReset = function (passwordResetToken, password, passwordConfirm, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'token': passwordResetToken,
            'password': password,
            'passwordConfirm': passwordConfirm,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/confirm-password-reset', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Sends auth record verification email request.
     */
    RecordService.prototype.requestVerification = function (email, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'email': email,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/request-verification', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Confirms auth record email verification request.
     */
    RecordService.prototype.confirmVerification = function (verificationToken, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'token': verificationToken,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/confirm-verification', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Sends an email change request to the authenticated record model.
     */
    RecordService.prototype.requestEmailChange = function (newEmail, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'newEmail': newEmail,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/request-email-change', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Confirms auth record's new email address.
     */
    RecordService.prototype.confirmEmailChange = function (emailChangeToken, password, bodyParams, queryParams) {
        if (bodyParams === void 0) { bodyParams = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        bodyParams = Object.assign({
            'token': emailChangeToken,
            'password': password,
        }, bodyParams);
        return this.client.send(this.baseCollectionPath + '/confirm-email-change', {
            'method': 'POST',
            'params': queryParams,
            'body': bodyParams,
        }).then(function () { return true; });
    };
    /**
     * Lists all linked external auth providers for the specified auth record.
     */
    RecordService.prototype.listExternalAuths = function (recordId, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(this.baseCrudPath + '/' + encodeURIComponent(recordId) + '/external-auths', {
            'method': 'GET',
            'params': queryParams,
        }).then(function (responseData) {
            var items = [];
            if (Array.isArray(responseData)) {
                for (var _i = 0, responseData_1 = responseData; _i < responseData_1.length; _i++) {
                    var item = responseData_1[_i];
                    items.push(new ExternalAuth(item));
                }
            }
            return items;
        });
    };
    /**
     * Unlink a single external auth provider from the specified auth record.
     */
    RecordService.prototype.unlinkExternalAuth = function (recordId, provider, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.client.send(this.baseCrudPath + '/' + encodeURIComponent(recordId) + '/external-auths/' + encodeURIComponent(provider), {
            'method': 'DELETE',
            'params': queryParams,
        }).then(function () { return true; });
    };
    return RecordService;
}(CrudService));
export default RecordService;
