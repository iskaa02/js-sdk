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
import BaseAuthStore from '@/stores/BaseAuthStore';
import Record from '@/models/Record';
import Admin from '@/models/Admin';
/**
 * The default token store for browsers with auto fallback
 * to runtime/memory if local storage is undefined (eg. in node env).
 */
var LocalAuthStore = /** @class */ (function (_super) {
    __extends(LocalAuthStore, _super);
    function LocalAuthStore(storageKey) {
        if (storageKey === void 0) { storageKey = "pocketbase_auth"; }
        var _this = _super.call(this) || this;
        _this.storageFallback = {};
        _this.storageKey = storageKey;
        return _this;
    }
    Object.defineProperty(LocalAuthStore.prototype, "token", {
        /**
         * @inheritdoc
         */
        get: function () {
            var data = this._storageGet(this.storageKey) || {};
            return data.token || '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalAuthStore.prototype, "model", {
        /**
         * @inheritdoc
         */
        get: function () {
            var _a;
            var data = this._storageGet(this.storageKey) || {};
            if (data === null ||
                typeof data !== 'object' ||
                data.model === null ||
                typeof data.model !== 'object') {
                return null;
            }
            // admins don't have `collectionId` prop
            if (typeof ((_a = data.model) === null || _a === void 0 ? void 0 : _a.collectionId) === 'undefined') {
                return new Admin(data.model);
            }
            return new Record(data.model);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritdoc
     */
    LocalAuthStore.prototype.save = function (token, model) {
        this._storageSet(this.storageKey, {
            'token': token,
            'model': model,
        });
        _super.prototype.save.call(this, token, model);
    };
    /**
     * @inheritdoc
     */
    LocalAuthStore.prototype.clear = function () {
        this._storageRemove(this.storageKey);
        _super.prototype.clear.call(this);
    };
    // ---------------------------------------------------------------
    // Internal helpers:
    // ---------------------------------------------------------------
    /**
     * Retrieves `key` from the browser's local storage
     * (or runtime/memory if local storage is undefined).
     */
    LocalAuthStore.prototype._storageGet = function (key) {
        if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.localStorage)) {
            var rawValue = window.localStorage.getItem(key) || '';
            try {
                return JSON.parse(rawValue);
            }
            catch (e) { // not a json
                return rawValue;
            }
        }
        // fallback
        return this.storageFallback[key];
    };
    /**
     * Stores a new data in the browser's local storage
     * (or runtime/memory if local storage is undefined).
     */
    LocalAuthStore.prototype._storageSet = function (key, value) {
        if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.localStorage)) {
            // store in local storage
            var normalizedVal = value;
            if (typeof value !== 'string') {
                normalizedVal = JSON.stringify(value);
            }
            window.localStorage.setItem(key, normalizedVal);
        }
        else {
            // store in fallback
            this.storageFallback[key] = value;
        }
    };
    /**
     * Removes `key` from the browser's local storage and the runtime/memory.
     */
    LocalAuthStore.prototype._storageRemove = function (key) {
        var _a;
        // delete from local storage
        if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.localStorage)) {
            (_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.removeItem(key);
        }
        // delete from fallback
        delete this.storageFallback[key];
    };
    return LocalAuthStore;
}(BaseAuthStore));
export default LocalAuthStore;
