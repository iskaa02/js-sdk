import { cookieParse, cookieSerialize } from '@/stores/utils/cookie';
import { isTokenExpired, getTokenPayload } from '@/stores/utils/jwt';
import Record from '@/models/Record';
import Admin from '@/models/Admin';
var defaultCookieKey = 'pb_auth';
/**
 * Base AuthStore class that is intended to be extended by all other
 * PocketBase AuthStore implementations.
 */
var BaseAuthStore = /** @class */ (function () {
    function BaseAuthStore() {
        this.baseToken = '';
        this.baseModel = null;
        this._onChangeCallbacks = [];
    }
    Object.defineProperty(BaseAuthStore.prototype, "token", {
        /**
         * Retrieves the stored token (if any).
         */
        get: function () {
            return this.baseToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseAuthStore.prototype, "model", {
        /**
         * Retrieves the stored model data (if any).
         */
        get: function () {
            return this.baseModel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseAuthStore.prototype, "isValid", {
        /**
         * Checks if the store has valid (aka. existing and unexpired) token.
         */
        get: function () {
            return !isTokenExpired(this.token);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Saves the provided new token and model data in the auth store.
     */
    BaseAuthStore.prototype.save = function (token, model) {
        this.baseToken = token || '';
        // normalize the model instance
        if (model !== null && typeof model === 'object') {
            this.baseModel = typeof model.collectionId !== 'undefined' ?
                new Record(model) : new Admin(model);
        }
        else {
            this.baseModel = null;
        }
        this.triggerChange();
    };
    /**
     * Removes the stored token and model data form the auth store.
     */
    BaseAuthStore.prototype.clear = function () {
        this.baseToken = '';
        this.baseModel = null;
        this.triggerChange();
    };
    /**
     * Parses the provided cookie string and updates the store state
     * with the cookie's token and model data.
     */
    BaseAuthStore.prototype.loadFromCookie = function (cookie, key) {
        if (key === void 0) { key = defaultCookieKey; }
        var rawData = cookieParse(cookie || '')[key] || '';
        var data = {};
        try {
            data = JSON.parse(rawData);
            // normalize
            if (typeof data === null || typeof data !== 'object' || Array.isArray(data)) {
                data = {};
            }
        }
        catch (_) { }
        this.save(data.token || '', data.model || null);
    };
    /**
     * Exports the current store state as cookie string.
     *
     * By default the following optional attributes are added:
     * - Secure
     * - HttpOnly
     * - SameSite=Strict
     * - Path=/
     * - Expires={the token expiration date}
     *
     * NB! If the generated cookie exceeds 4096 bytes, this method will
     * strip the model data to the bare minimum to try to fit within the
     * recommended size in https://www.rfc-editor.org/rfc/rfc6265#section-6.1.
     */
    BaseAuthStore.prototype.exportToCookie = function (options, key) {
        var _a, _b, _c;
        if (key === void 0) { key = defaultCookieKey; }
        var defaultOptions = {
            secure: true,
            sameSite: true,
            httpOnly: true,
            path: "/",
        };
        // extract the token expiration date
        var payload = getTokenPayload(this.token);
        if (payload === null || payload === void 0 ? void 0 : payload.exp) {
            defaultOptions.expires = new Date(payload.exp * 1000);
        }
        else {
            defaultOptions.expires = new Date('1970-01-01');
        }
        // merge with the user defined options
        options = Object.assign({}, defaultOptions, options);
        var rawData = {
            token: this.token,
            model: ((_a = this.model) === null || _a === void 0 ? void 0 : _a.export()) || null,
        };
        var result = cookieSerialize(key, JSON.stringify(rawData), options);
        var resultLength = typeof Blob !== 'undefined' ?
            (new Blob([result])).size : result.length;
        // strip down the model data to the bare minimum
        if (rawData.model && resultLength > 4096) {
            rawData.model = { id: (_b = rawData === null || rawData === void 0 ? void 0 : rawData.model) === null || _b === void 0 ? void 0 : _b.id, email: (_c = rawData === null || rawData === void 0 ? void 0 : rawData.model) === null || _c === void 0 ? void 0 : _c.email };
            if (this.model instanceof Record) {
                rawData.model.username = this.model.username;
                rawData.model.verified = this.model.verified;
                rawData.model.collectionId = this.model.collectionId;
            }
            result = cookieSerialize(key, JSON.stringify(rawData), options);
        }
        return result;
    };
    /**
     * Register a callback function that will be called on store change.
     *
     * You can set the `fireImmediately` argument to true in order to invoke
     * the provided callback right after registration.
     *
     * Returns a removal function that you could call to "unsubscribe" from the changes.
     */
    BaseAuthStore.prototype.onChange = function (callback, fireImmediately) {
        var _this = this;
        if (fireImmediately === void 0) { fireImmediately = false; }
        this._onChangeCallbacks.push(callback);
        if (fireImmediately) {
            callback(this.token, this.model);
        }
        return function () {
            for (var i = _this._onChangeCallbacks.length - 1; i >= 0; i--) {
                if (_this._onChangeCallbacks[i] == callback) {
                    delete _this._onChangeCallbacks[i]; // removes the function reference
                    _this._onChangeCallbacks.splice(i, 1); // reindex the array
                    return;
                }
            }
        };
    };
    BaseAuthStore.prototype.triggerChange = function () {
        for (var _i = 0, _a = this._onChangeCallbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback && callback(this.token, this.model);
        }
    };
    return BaseAuthStore;
}());
export default BaseAuthStore;
